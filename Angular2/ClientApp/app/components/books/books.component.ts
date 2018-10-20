import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';

import {IApiBook} from "../../interfaces/IApiBook";
import { Book } from "../../models/Book";
import {ImageViewModel} from "../../models/Image";
import {BaseComponent} from "../base/base.component";

@Component({
    selector: 'books',
    templateUrl: './books.component.html'
})
export class BooksComponent extends BaseComponent {
    constructor(private http: HttpClient) {
        super(http);

        this.loading = false;
        this.success = true;
        this.books = [];
        
        this.registerFunctions();
    }
    
    /* Declarations */
    success: boolean;
    loading: boolean;
    baseApiUrl: string;
    searchString = '';
    hasBooks = false;
    books: Book[];
    
    getDwBook: () => void;
    private getBookImageData: (book: Book) => void;
    
    /* callbacks */
    private processBookResponseCallback: (result: HttpResponse<any>, success: boolean) => void;
    private processBookArtResponseCallback: (result: HttpResponse<any>, success: boolean) => void;

    private registerFunctions() {
        
        this.processBookResponseCallback = (result: HttpResponse<any>, success: boolean) => {
            this.books = [];
            (result.body as any[]).forEach((serverBook: IApiBook) => {
                let newBook = new Book(serverBook.bookId,
                    serverBook.bookOrdinal, serverBook.bookName,
                    serverBook.bookIsbn10, serverBook.bookIsbn13,
                    serverBook.bookDescription,
                    serverBook.characters, serverBook.series);
                this.getBookImageData(newBook);
                this.books.push(newBook);
            });

            this.hasBooks = this.books && this.books.length > 0;
            this.success = success;
            this.loading = false;
        };
        
        this.processBookArtResponseCallback = (result: HttpResponse<any>) => {
            let serverData = result.body as IApiBook;
            let book = this.books.find(book => book.bookId == serverData.bookId);
            if (!book) {
                throw new Error(`Couldn't find book with id of ${serverData.bookId}`);
            }
            book.coverData = new ImageViewModel(
                serverData.bookCoverImage, serverData.bookImageIsBase64String
            );
        };
        
        
        this.getDwBook = () => {
            // ensure that the api is running before the user can do anything
            this.checkApiIsRunning();
            
            let route = `${this.bookSearchBaseUrl(this.searchString)}`;
            this.loading = true;
            this.performXhr(route,  this.processBookResponseCallback);
        };

        this.getBookImageData = (book: Book) => {
            let route = `${this.bookGetCoverUrl(book.bookId)}`;
            this.performXhr(route, this.processBookArtResponseCallback);
        };
    }
}

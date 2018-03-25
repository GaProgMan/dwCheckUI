import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Book } from "../../models/Book";
import {ImageViewModel} from "../../models/Image";
import {IApiBook} from "../../interfaces/IApiBook";
import {BaseComponent} from "../base/base.component";

@Component({
    selector: 'books',
    templateUrl: './books.component.html'
})

export class BooksComponent extends BaseComponent {
    constructor(http: Http) {
        super(http);
        
        this.http = http;

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
    
    private getDwBook: () => void;
    private getBookImageData: (book: Book) => void;
    
    /* callbacks */
    private processBookResponseCallback: (result: Response, success: boolean) => void;
    private processBookArtResponseCallback: (result: Response) => void;

    private registerFunctions() {
        
        this.processBookResponseCallback = (result: Response, success: boolean) => {
            this.books = [];
            result.json().result.forEach((serverBook: IApiBook) => {
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
        
        this.processBookArtResponseCallback = (result: Response) => {
            let serverData = result.json().result as IApiBook;
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


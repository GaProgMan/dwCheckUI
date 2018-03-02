import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ResultJson } from "../../models/ResultJson";
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
        super();
        
        this.http = http;

        this.loading = false;
        this.success = true;
        this.books = [];
        
        this.registerFunctions();
    }
    
    /* Declarations */
    private http: Http;

    success: boolean;
    loading: boolean;
    baseApiUrl: string;
    searchString = '';
    hasBooks = false;
    books: Book[];
    
    getDwBook: () => void;
    
    private getBookImageData: (book: Book) => void;

    private registerFunctions() {
        this.getDwBook = () => {
            let route = `${this.bookSearchBaseUrl(this.searchString)}`;
            this.loading = true;
            this.http.get(route).subscribe((result) => {
                var resultJson = result.json() as ResultJson;
                if(resultJson.success) {
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
                }
                
                this.hasBooks = this.books && this.books.length > 0;
                this.success = resultJson.success;
                this.loading = false;
            });
        };

        this.getBookImageData = (book: Book) => {
            let route = `${this.bookGetCoverUrl(book.bookId)}`;
            this.http.get(route).subscribe((result) => {
                let resultJson = result.json() as ResultJson;
                if (resultJson.success) {
                    let serverData = result.json().result;
                    book.coverData = new ImageViewModel(
                        serverData.bookCoverImage, serverData.bookImageIsBase64String
                    );
                }
            });
        };
    }
}


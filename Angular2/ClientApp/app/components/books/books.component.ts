import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ResultJson } from "../../models/ResultJson";
import { Book } from "../../models/Book";
import {ImageViewModel} from "../../models/Image";

@Component({
    selector: 'books',
    templateUrl: './books.component.html'
})

export class BooksComponent {
    constructor(http: Http) {
        this.http = http;

        this.loading = false;
        this.success = true;
        this.baseApiUrl =  'http://dwcheckapi.azurewebsites.net/Books/Search?searchString=';
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
            var route = `${this.baseApiUrl}${this.searchString}`;
            this.loading = true;
            this.http.get(route).subscribe((result) => {
                var resultJson = result.json() as ResultJson;
                if(resultJson.success) {
                    this.books = [];
                    result.json().result.forEach((serverBook: ApiBook) => {
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
            let route = `http://dwcheckapi.azurewebsites.net/Books/GetBookCover/${book.bookId}`;
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

interface ApiBook {
    bookId: number;
    bookOrdinal: number;
    bookCoverImage: string;
    bookImageIsBase64String: boolean;
    bookDescription: string;
    bookIsbn10: string;
    bookIsbn13: string;
    bookName: string;
    characters: string[];
    series: string[];
}
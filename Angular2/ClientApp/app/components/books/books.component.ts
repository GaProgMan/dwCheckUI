import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ResultJson } from "../../models/ResultJson";
import { Book } from "../../models/Book";

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
    books: Book[];

    getDwBook: () => void;

    private registerFunctions() {
        this.getDwBook = () => {
            var route = `${this.baseApiUrl}${this.searchString}`;
            this.loading = true;
            this.http.get(route).subscribe((result) => {
                var resultJson = result.json() as ResultJson;
                if(resultJson.success) {
                    this.books = [];
                    result.json().result.forEach((serverBook: ApiBook) => {
                        this.books.push(
                            new Book(serverBook.bookOrdinal, serverBook.bookName,
                                serverBook.bookIsbn10, serverBook.bookIsbn13,
                                serverBook.bookDescription, serverBook.bookCoverImage,
                                serverBook.bookImageIsBase64String,
                                serverBook.characters, serverBook.series)
                        );
                    });
                }
                this.success = resultJson.success;
                this.loading = false;
            });
        }
    }
}

interface ApiBook {
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
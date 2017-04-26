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
        this.books = null;
        this.registerFunctions();
    }
    // private vars
    private http: Http;

    // public bound vars
    success: boolean;
    loading: boolean;
    baseApiUrl: string;
    searchString = '';
    books: IBook[];

    // public functions
    getDwBook: () => void;

    private registerFunctions() {
        this.getDwBook = () => {
            var route = `${this.baseApiUrl}${this.searchString}`;
            this.loading = true;
            this.http.get(route).subscribe((result) => {
                var resultJson = result.json() as IResultJson;
                if(resultJson.success) {
                    this.books = new Array<IBook>();
                    result.json().result.forEach(element => {
                        this.books.push(new Book(element.bookName, element.bookIsbn10,
                                element.bookIsbn13, element.bookDescription, 
                                element.bookCoverImageUrl));
                    });
                }
                this.success = resultJson.success;
                this.loading = false;
            });
        }
    }
}
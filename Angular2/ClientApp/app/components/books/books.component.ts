import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'books',
    templateUrl: './books.component.html'
})
export class BooksComponent {
    constructor(http: Http) {
        this.http = http;

        this.loading = false;
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
    books: Book[];

    // public functions
    getDwBook: () => void;

    private registerFunctions() {
        this.getDwBook = () => {
            var route = `${this.baseApiUrl}${this.searchString}`;
            this.loading = true;
            this.http.get(route).subscribe((result) => {
                var resultJson = result.json() as ResultJson;
                if(resultJson.success) {
                    this.books = new Array<Book>();
                    result.json().result.forEach(element => {
                        this.books.push(new Book(element.bookName, element.bookIsbn10,
                                element.bookIsbn13, element.bookDescription, 
                                element.bookCoverImageUrl));
                    });
                }
                this.loading = false;
            });
        }
    }
}

interface ResultJson{
    success: boolean;
    result: string;
}

class Book implements IBook {
    constructor(bookName: string, bookIsbn10: string, bookIsbn13:
                string, bookDescription: string, bookCoverImageUrl: string){
        this.bookName = bookName;
        this.bookIsbn10 = bookIsbn10;
        this.bookIsbn13 = bookIsbn13;
        this.bookDescription = bookDescription;
        this.bookCoverImageUrl = bookCoverImageUrl;
    }

    bookName: string;
    bookIsbn10: string;
    bookIsbn13: string;
    bookDescription: string;
    bookCoverImageUrl: string;


}

interface IBook {
    bookName: string;
    bookIsbn10: string;
    bookIsbn13: string;
    bookDescription: string;
    bookCoverImageUrl: string;
}
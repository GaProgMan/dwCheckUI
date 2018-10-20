import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";

import { IApiBook } from "../interfaces/IApiBook";
import { Book } from "../models/Book";
import { ImageViewModel } from "../models/Image";
import { BaseService } from "./base.service";

@Injectable()
export class BookService extends BaseService {

    constructor(http: HttpClient) {
        super(http)
    }

    // XHR Calls

    findBooksByName(value: string): Observable<IApiBook[]> {
        return this.makeSafeCall<IApiBook[]>(this.bookSearchBaseUrl(value))
    }

    getBookCoverArt(book: Book): Observable<Book> {
        return this.makeSafeCall<IApiBook>(this.bookGetCoverUrl(book.bookId)).pipe(
            map(hydratedBook => {
                book.coverData = new ImageViewModel(hydratedBook.bookCoverImage, hydratedBook.bookImageIsBase64String)
                return book
            }))
    }

    getBookById(id: number): Observable<Book> {
        return this.makeSafeCall<Book>(this.bookGetBaseUrl(id))
    }

    // URL Generators

    bookGetBaseUrl(bookOrdinal: number): string {
        return `${this.apiBaseUrl}Books/Get/${bookOrdinal}/`; 
    };

    bookGetCoverUrl(bookId: number): string {
        return `${this.apiBaseUrl}Books/GetBookCover/${bookId}/`;
    };
    
    bookSearchBaseUrl(searchString: string): string {
        return `${this.apiBaseUrl}Books/Search?searchString=${searchString}`;  
    };
}
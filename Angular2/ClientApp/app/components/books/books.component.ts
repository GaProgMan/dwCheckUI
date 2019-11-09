import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import {IApiBook} from "../../interfaces/IApiBook";
import { Book } from "../../models/Book";
import { BookService } from '../../services/book.service';

@Component({
    selector: 'books',
    templateUrl: './books.component.html'
})
export class BooksComponent {
    /* Declarations */
    success: boolean = true;
    loading: boolean = false;
    searchString = '';
    books = new BehaviorSubject<Book[]>([]);

    constructor(private bookService: BookService) { }
        
    processBook(apiBook: IApiBook): Observable<Book> {
        let newBook = new Book(apiBook.bookId,
            apiBook.bookOrdinal, apiBook.bookName,
            apiBook.bookIsbn10, apiBook.bookIsbn13,
            apiBook.bookDescription,
            apiBook.characters, apiBook.series);
        return this.bookService.getBookCoverArt(newBook);
    };  
    
    
    getDwBook() {
        this.books.next([])
        this.loading = true
        this.bookService.findBooksByName(this.searchString).subscribe(books => {
            this.success = true
            books.forEach(book => {
                this.processBook(book).subscribe(hydratedBook => {
                    if (!this.books.value.some(b => b.bookId === hydratedBook.bookId)) {
                        const updatedbookList = this.books.value
                        updatedbookList.push(hydratedBook)
                        this.books.next(updatedbookList)
                        this.loading = false
                    }
                })
            })   
        }, 
        error => this.success = false)
    };
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Http, Response } from '@angular/http';
import { BookBaseViewModel } from "../../models/Book";
import { ImageViewModel } from "../../models/Image";
import { BaseComponent } from "../base/base.component";
import { IApiBookBaseViewModel } from "../../interfaces/IApiBookSeries";
import { IApiBook } from "../../interfaces/IApiBook";

@Component({
    selector: 'seriesProfile',
    templateUrl: './seriesProfile.component.html'
})

export class SeriesProfileComponent extends BaseComponent implements OnInit, OnDestroy {
    constructor(private route: ActivatedRoute, http: Http) {
        super(http);
        
        this.registerFunctions();
    }

    loading = false;
    success = true;
    seriesId: number;
    hasBooks = false;
    books: BookBaseViewModel[];
    
    private subscription: any;
    private getBooksCallback: (response: Response, success: boolean) => void;
    private getBookImageData: (book: BookBaseViewModel) => void;
    private getBookImageDataCallback: (response: Response, success: boolean) => void;

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.seriesId = +params['id']; // the + here converts a string to a number
            let route = `${this.seriesBookBaseUrl(this.seriesId)}`;
            this.performXhr(route, this.getBooksCallback);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    
    private registerFunctions = () => {
        
        this.getBooksCallback = (response: Response, success: boolean) => {
            if (success) {
                this.books = [];
                response.json().result.forEach((serverBook: IApiBookBaseViewModel) => {
                    let newData = new BookBaseViewModel(serverBook.bookId,
                        serverBook.bookDescription, serverBook.bookName,
                        serverBook.bookOrdinal);
                    this.getBookImageData(newData);
                    this.books.push(newData);
                });
            }

            this.hasBooks = this.books && this.books.length > 0;
            this.success = success;
            this.loading = false;
        };
        
        this.getBookImageDataCallback =(response: Response, success:boolean) => {
            if (success) {
                let serverData = response.json().result as IApiBook;
                let book = this.books.find(b => b.bookId == serverData.bookId);
                if (!book) {
                    throw new Error(`Couldn't find book with id of ${serverData.bookId}`);
                }
                book.coverData = new ImageViewModel(
                    serverData.bookCoverImage, serverData.bookImageIsBase64String
                );
            }
        };
        
        this.getBookImageData = (book: BookBaseViewModel) => {
            let route = `${this.bookGetCoverUrl(book.bookId)}`;
            this.performXhr(route, this.getBookImageDataCallback);
        }
    };
    
}
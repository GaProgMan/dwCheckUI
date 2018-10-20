import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { IApiBook } from "../../interfaces/IApiBook";
import { IApiBookBaseViewModel } from "../../interfaces/IApiBookSeries";
import { BookBaseViewModel } from "../../models/Book";
import { ImageViewModel } from "../../models/Image";
import { BaseComponent } from "../base/base.component";

@Component({
    selector: 'seriesProfile',
    templateUrl: './seriesProfile.component.html'
})

export class SeriesProfileComponent extends BaseComponent implements OnInit, OnDestroy {
    constructor(private route: ActivatedRoute, http: HttpClient) {
        super(http);
        
        this.registerFunctions();
    }

    loading = false;
    success = true;
    seriesId: number;
    hasBooks = false;
    books: BookBaseViewModel[];
    
    private subscription: any;
    private getBooksCallback: (response: HttpResponse<any>, success: boolean) => void;
    private getBookImageData: (book: BookBaseViewModel) => void;
    private getBookImageDataCallback: (response: HttpResponse<any>, success: boolean) => void;

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
        
        this.getBooksCallback = (response: HttpResponse<any>, success: boolean) => {
            if (success) {
                this.books = [];
                (response.body as any[]).forEach((serverBook: IApiBookBaseViewModel) => {
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
        
        this.getBookImageDataCallback =(response: HttpResponse<any>, success:boolean) => {
            if (success) {
                let serverData = response.body as IApiBook;
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
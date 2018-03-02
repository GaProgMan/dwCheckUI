import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Http } from '@angular/http';
import { ResultJson } from "../../models/ResultJson";
import { BookBaseViewModel } from "../../models/Book";
import { ImageViewModel } from "../../models/Image";
import {BaseComponent} from "../base/base.component";
import {IApiBookBaseViewModel} from "../../interfaces/IApiBookSeries";

@Component({
    selector: 'seriesProfile',
    templateUrl: './seriesProfile.component.html'
})

export class SeriesProfileComponent extends BaseComponent implements OnInit, OnDestroy {
    constructor(private route: ActivatedRoute, public http: Http) {
        super();
    }

    loading = false;
    success = true;
    baseApiUrl = 'http://dwcheckapi.azurewebsites.net/Books/Series';
    seriesId: number;
    hasBooks = false;
    books: BookBaseViewModel[];
    
    private subscription: any;

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.seriesId = +params['id']; // the + here converts a string to a number

            let route = `${this.seriesBookBaseUrl(this.seriesId)}`;

            this.http.get(route).subscribe((result) => {
                let resultJson = result.json() as ResultJson;
                if (resultJson.success) {
                    this.books = [];
                    result.json().result.forEach((serverBook: IApiBookBaseViewModel) => {
                        let newData = new BookBaseViewModel(serverBook.bookId,
                            serverBook.bookDescription, serverBook.bookName,
                            serverBook.bookOrdinal);
                        this.getBookImageData(newData);
                        this.books.push(newData);
                    });
                }
                
                this.hasBooks = this.books && this.books.length > 0; 
                this.success = resultJson.success;
                this.loading = false;
            });
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private getBookImageData = (book: BookBaseViewModel) => {
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
    }
    
}
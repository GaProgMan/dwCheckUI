import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Http } from '@angular/http';
import { ResultJson } from "../../models/ResultJson";
import { BookBaseViewModel } from "../../models/Book";
import {ImageViewModel} from "../../models/Image";

@Component({
    selector: 'seriesProfile',
    templateUrl: './seriesProfile.component.html'
})

export class SeriesProfileComponent implements OnInit, OnDestroy {
    constructor(private route: ActivatedRoute, public http: Http) {
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

            var route = `${this.baseApiUrl}/${this.seriesId}`;

            this.http.get(route).subscribe((result) => {
                var resultJson = result.json() as ResultJson;
                if (resultJson.success) {
                    this.books = [];
                    result.json().result.forEach((serverBook: ApiBookBaseViewModel) => {
                        let newData = new BookBaseViewModel(serverBook.bookId,
                            serverBook.bookDescription);
                        newData.coverData = new ImageViewModel(
                            serverBook.bookCoverImage, serverBook.bookImageIsBase64String
                        );
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
    
}

interface ApiBookBaseViewModel {
    bookId: number;
    bookCoverImage: string;
    bookImageIsBase64String: boolean;
    bookDescription: string;
}
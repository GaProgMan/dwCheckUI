import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Http } from '@angular/http';
import { ResultJson } from "../../models/ResultJson";
import { Book } from "../../models/Book";

@Component({
    selector: 'bookProfile',
    templateUrl: './bookProfile.component.html'
})

export class BookProfileComponent implements OnInit, OnDestroy {
    constructor(private route: ActivatedRoute, public http: Http) {
    }
    
    bookOrdinal: number;
    book: Book;
    loading = false;
    success = true;
    baseApiUrl = 'http://dwcheckapi.azurewebsites.net/Books/Get';
    
    private subscription: any;
    
    ngOnInit() {
        this.subscription = this.route.params.subscribe(params =>
        {
            this.bookOrdinal = +params['id']; // the + here converts a string to a number
            
            var route = `${this.baseApiUrl}/${this.bookOrdinal}`;

            this.http.get(route).subscribe((result) => {
                var resultJson = result.json() as ResultJson;
                if (resultJson.success) {
                    var serverBook = result.json().result;
                    this.book = new Book(serverBook.bookOrdinal, serverBook.bookName,
                        serverBook.bookIsbn10, serverBook.bookIsbn13,
                        serverBook.bookDescription, serverBook.bookCoverImage,
                        serverBook.bookImageIsBase64String,
                        serverBook.characters, serverBook.series);
                }
                this.loading = false;
            });
        });
    }
    
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
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
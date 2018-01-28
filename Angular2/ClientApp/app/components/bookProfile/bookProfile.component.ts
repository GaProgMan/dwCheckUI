import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Http } from '@angular/http';
import { ResultJson } from "../../models/ResultJson";
import { Book } from "../../models/Book";
import { ImageViewModel} from "../../models/Image";

@Component({
    selector: 'bookProfile',
    templateUrl: './bookProfile.component.html'
})

export class BookProfileComponent implements OnInit, OnDestroy {
    constructor(private route: ActivatedRoute, public http: Http) {
        this.registerFunctions();
    }
    
    bookOrdinal: number;
    book: Book;
    loading = false;
    success = true;
    baseApiUrl = 'http://dwcheckapi.azurewebsites.net/Books/Get';
    bookFound = false;
    
    private subscription: any;
    private getBookImageData: () => void;
    
    ngOnInit() {
        this.subscription = this.route.params.subscribe(params =>
        {
            this.bookOrdinal = +params['id']; // the + here converts a string to a number
            
            let route = `${this.baseApiUrl}/${this.bookOrdinal}`;

            this.http.get(route).subscribe((result) => {
                let resultJson = result.json() as ResultJson;
                if (resultJson.success) {
                    let serverBook = result.json().result;
                    this.book = new Book(serverBook.bookId,
                        serverBook.bookOrdinal, serverBook.bookName,
                        serverBook.bookIsbn10, serverBook.bookIsbn13,
                        serverBook.bookDescription, serverBook.characters,
                        serverBook.series);
                    
                    this.getBookImageData();
                }
                
                this.bookFound = this.book != null;
                this.loading = false;
            });
        });
    }
    
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    
    registerFunctions = () => {
        this.getBookImageData =() => {
            let route = `http://dwcheckapi.azurewebsites.net/Books/GetBookCover/${this.book.bookId}`;
            this.http.get(route).subscribe((result) => {
                let resultJson = result.json() as ResultJson;
                if (resultJson.success) {
                    let serverData = result.json().result;
                    this.book.coverData = new ImageViewModel(
                        serverData.bookCoverImage, serverData.bookImageIsBase64String
                    );
                }
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
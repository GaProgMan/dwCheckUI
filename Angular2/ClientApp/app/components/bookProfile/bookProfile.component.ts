import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {Http, Response} from '@angular/http';
import { ResultJson } from "../../models/ResultJson";
import { Book } from "../../models/Book";
import { ImageViewModel} from "../../models/Image";
import { BaseComponent } from "../base/base.component";

@Component({
    selector: 'bookProfile',
    templateUrl: './bookProfile.component.html'
})

export class BookProfileComponent extends BaseComponent implements OnInit, OnDestroy {
    constructor(private route: ActivatedRoute, http: Http) {
        super(http);
        
        this.registerFunctions();
    }
    
    bookOrdinal: number;
    book: Book;
    loading = false;
    success = true;
    bookFound = false;
    
    private subscription: any;
    private getBookImageData: () => void;
    
    // callbacks
    private processBookCallback: (resultJson: Response, success: boolean) => void;
    private processBookArtResponseCallback: (result: Response) => void;
    
    ngOnInit() {
        this.subscription = this.route.params.subscribe(params =>  {
            this.bookOrdinal = +params['id']; // the + here converts a string to a number
            
            let route = `${this.bookGetBaseUrl(this.bookOrdinal)}`;

            this.performXhr(route, this.processBookCallback);
        });
    }
    
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    
    registerFunctions = () => {
        this.processBookCallback =  (resultJson: Response, success: boolean) => {
            if (success) {
                let serverBook = resultJson.json().result;
                this.book = new Book(serverBook.bookId,
                    serverBook.bookOrdinal, serverBook.bookName,
                    serverBook.bookIsbn10, serverBook.bookIsbn13,
                    serverBook.bookDescription, serverBook.characters,
                    serverBook.series);

                this.getBookImageData();
            }

            this.bookFound = this.book != null;
            this.loading = false;
        };
        
        this.processBookArtResponseCallback = (result: Response) => {
            let serverData = result.json().result;
            this.book.coverData = new ImageViewModel(
                serverData.bookCoverImage, serverData.bookImageIsBase64String
            );
        };
        
        this.getBookImageData =() => {
            let route = `${this.bookGetCoverUrl(this.book.bookId)}`;
            this.performXhr(route, this.processBookArtResponseCallback);
        }
    }
}
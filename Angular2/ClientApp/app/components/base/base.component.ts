import {HttpClient, HttpResponse} from "@angular/common/http";

import {ResultJson} from "../../models/ResultJson";

export class BaseComponent {
    constructor(protected http: HttpClient) { }
    
    private apiIsrunning: boolean = false;

    private apiBaseUrl = () :string => {
        return `${window.location.protocol}//dwcheckapi.azurewebsites.net/`;
    };
    
    getVersionUrl =() :string => {
        return `${this.apiBaseUrl()}version`;
    };
    
    bookGetBaseUrl = (bookOrdinal: number): string => {
      return `${this.apiBaseUrl()}Books/Get/${bookOrdinal}/`; 
    };

    bookGetCoverUrl = (bookId: number):string => {
        return `${this.apiBaseUrl()}Books/GetBookCover/${bookId}/`;
    };
    
    bookSearchBaseUrl = (searchString: string) : string => {
       return `${this.apiBaseUrl()}Books/Search?searchString=${searchString}`;  
    };
    
    characterSearchBaseUrl = (searchString: string): string => {
        return `${this.apiBaseUrl()}Characters/Search?searchString=${searchString}`;
    };
    
    seriesSearchBaseUrl = (searchString: string): string => {
        return `${this.apiBaseUrl()}series/search?searchString=${searchString}`; 
    };
    
    seriesBookBaseUrl = (seriesId: number): string => {
      return `${this.apiBaseUrl()}Books/Series/${seriesId}/`; 
    };
    
    checkApiIsRunning =() => {
        if (!this.apiIsrunning) {
            this.http.get(this.getVersionUrl())
                .subscribe((result) => {
                    // should really do somthing useful here
                });
        }
    };
    
    performXhr = (route: string, successCallback: (response: HttpResponse<any>, success: boolean) => void) => {
        this.http.get(route, {observe: 'response'}).subscribe((response: HttpResponse<any>) => {
            if (response.ok) {
                successCallback(response, response.ok);
            }
            
        });
    }
}
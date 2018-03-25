import {Http, Response} from "@angular/http";
import {ResultJson} from "../../models/ResultJson";

export class BaseComponent {
    constructor(http: Http) {
        this.http = http;
    }
    
    private apiIsrunning: boolean;
    http: Http;

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
    
    performXhr = (route: string, successCallback: (response: Response, success: boolean) => void) => {
        this.http.get(route).subscribe((result: Response) => {
            let resultJson = result.json() as ResultJson;
            if (resultJson.success) {
                successCallback(result, resultJson.success);
            }
            
        });
    }
}
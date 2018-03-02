export class BaseComponent {
    constructor() { }

    private apiBaseUrl = () :string => {
        return `${window.location.protocol}//dwcheckapi.azurewebsites.net/`;
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
        return `${this.apiBaseUrl()}/series/search?searchString=${searchString}`; 
    };
    
    seriesBookBaseUrl = (seriesId: number): string => {
      return `${this.apiBaseUrl()}/Books/Series/${seriesId}/`; 
    };
}
export class Series {
    constructor(seriesId: number,  seriesName: string, books: string[]) {
        this.seriesId = seriesId;
        this.seriesName = seriesName;
        this.books = books;
        
        this.registerFunctions();
    }
    seriesId: number;
    seriesName: string;
    books: string[];
    booksAsString: () => string;
    
    registerFunctions =() => {
        this.booksAsString = (): string =>{
            return this.books.length > 0
                ? this.books.join(',')
                : '';
        }
    }
}
export class Series {
    constructor(seriesName: string, books: string[]){
        this.seriesName = seriesName;
        this.books = books;
        
        this.registerFunctions();
    }
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
export class Series implements ISeries {
    constructor(seriesName: string, books: string[]){
        this.seriesName = seriesName;
        this.books = books;

        this.booksAsString = (): string =>{
            return books.map(b => b).join(', ');
        }
    }
    seriesName: string;
    books: string[];
    booksAsString: () => string;
}
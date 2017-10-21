export class Book {
    constructor(bookName: string, bookIsbn10: string, bookIsbn13: string,
                bookDescription: string, bookCoverImageUrl: string,
                characters: string[], series: string[]){
        this.bookName = bookName;
        this.bookIsbn10 = bookIsbn10;
        this.bookIsbn13 = bookIsbn13;
        this.bookDescription = bookDescription;
        this.bookCoverImageUrl = bookCoverImageUrl;
        this.characters = characters;
        this.series = series;
        
        this.registerFunctions();
    }

    bookName: string;
    bookIsbn10: string;
    bookIsbn13: string;
    bookDescription: string;
    bookCoverImageUrl: string;
    characters: string[];
    series: string[];
    
    charactersAsString: () => string;
    seriesAsString: () => string;
    
    registerFunctions = () =>  {
        this.charactersAsString = () => {
            return this.characters.length > 0
                ? this.characters.join(',')
                : '';
        };
        
        this.seriesAsString = () => {
          return this.series.length > 0
              ? this.series.join(',')
              : ''; 
        }
    }
}
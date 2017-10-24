export class BookBaseViewModel {
    constructor(bookDescription: string, bookCoverImageUrl: string){
        this.bookDescription = bookDescription;
        this.bookCoverImageUrl = bookCoverImageUrl;
    }

    bookDescription: string;
    bookCoverImageUrl: string;
}

export class Book extends BookBaseViewModel {
    constructor(bookOrdinal: number, bookName: string, bookIsbn10: string,
                bookIsbn13: string,  bookDescription: string, bookCoverImageUrl: string,
                characters: string[], series: string[]) {
        super(bookDescription, bookCoverImageUrl);
        
        this.bookOrdinal = bookOrdinal;
        this.bookName = bookName;
        this.bookIsbn10 = bookIsbn10;
        this.bookIsbn13 = bookIsbn13;
        this.characters = characters;
        this.series = series;
        
        this.registerFunctions();
    }

    bookOrdinal: number;
    bookName: string;
    bookIsbn10: string;
    bookIsbn13: string;
    bookDescription: string;
    bookCoverImageUrl: string;
    characters: string[];
    series: string[];
    
    charactersAsString: () => string;
    seriesAsString: () => string;
    
    charactersWithLineBreaks: () => string;
    
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
        };
        
        this.charactersWithLineBreaks = () =>  {
            return this.characters.length > 0
                ? this.characters.join('<br />')
                : '';
        };
    }
}
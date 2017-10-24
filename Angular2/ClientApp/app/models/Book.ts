export class BookBaseViewModel {
    constructor(bookDescription: string, bookCoverImage: string, bookImageBase64: boolean) {
        this.bookDescription = bookDescription;
        this.bookCoverImage = bookCoverImage;
        this.bookImageIsBase64 = bookImageBase64;
    }

    bookDescription: string;
    bookCoverImage: string;
    bookImageIsBase64: boolean;

    imageTag = (): string =>{
        return this.bookImageIsBase64
        ? `data:image/png;base64,${this.bookCoverImage}`
        : `${this.bookCoverImage}`;
    }
}

export class Book extends BookBaseViewModel {
    constructor(bookOrdinal: number, bookName: string, bookIsbn10: string,
                bookIsbn13: string,  bookDescription: string, bookCoverImage: string,
                bookCoverIsBase64: boolean, characters: string[], series: string[]) {
        super(bookDescription, bookCoverImage, bookCoverIsBase64);
        
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
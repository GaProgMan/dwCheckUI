import { ImageViewModel } from "./Image";

export class BookBaseViewModel {
    constructor(bookId: number, bookDescription: string) {
        this.bookId = bookId;
        this.bookDescription = bookDescription;
    }

    bookId: number;
    bookDescription: string;
    coverData: ImageViewModel;

    imageTag = (): string => {
        return this.coverData
            ? this.coverData.imageIsBase64
                ? `data:image/png;base64,${this.coverData.coverImage}`
                : `${this.coverData}`
            : '/images/loading-spinner.gif';
    }
}

export class Book extends BookBaseViewModel {
    constructor(bookId: number, bookOrdinal: number, bookName: string, bookIsbn10: string,
                bookIsbn13: string,  bookDescription: string, characters: string[],
                series: string[]) {
        
        super(bookId, bookDescription);
        
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
    characters: string[];
    series: string[];
    
    charactersAsString: () => string;
    seriesAsString: () => string;
    charactersWithLineBreaks: () => string;
    getImageData: () => void;
    
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
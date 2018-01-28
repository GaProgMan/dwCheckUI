import { ImageViewModel } from "./Image";

export class BookBaseViewModel {
    constructor(bookId: number, bookDescription: string, bookName: string, bookOrdinal: number) {
        this.bookId = bookId;
        this.bookDescription = bookDescription;
        this.bookName = bookName;
        this.bookOrdinal = bookOrdinal;
    }

    bookId: number;
    bookDescription: string;
    bookOrdinal: number;
    bookName: string;
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
                series: { [key: number]: string }) {
        super(bookId, bookDescription, bookName, bookOrdinal);
        
        this.bookIsbn10 = bookIsbn10;
        this.bookIsbn13 = bookIsbn13;
        this.characters = characters;

        if (series) {
            this.series = [];
            for (let key in series) {
                let value = series[key];
                this.series.push(new SeriesBaseViewModel(key, value));
            }
        }
        
        this.registerFunctions();
    }

    bookOrdinal: number;
    bookName: string;
    bookIsbn10: string;
    bookIsbn13: string;
    bookDescription: string;
    characters: string[];
    series: SeriesBaseViewModel[];
    
    seriesWithLineBreaksAndAnchors: () =>string;
    charactersWithLineBreaks: () => string;
    
    registerFunctions = () =>  {
        
        this.seriesWithLineBreaksAndAnchors = () => {
            if (this.series.length == 0) {
                return '';
            }
            
            let returnString = '';
            for(let index = 0; index < this.series.length; index++) {
                let seriesRecord = this.series[index];
                returnString +=
                    `<a href='/seriesProfile/${seriesRecord.seriesId}'>${seriesRecord.seriesName}</a>`;
            }
            return returnString;
        };
        
        this.charactersWithLineBreaks = () =>  {
            return this.characters.length > 0
                ? this.characters.join('<br />')
                : '';
        };
    }
}

export class SeriesBaseViewModel {
    constructor(seriesId: string,  seriesName: string) {
        this.seriesId = seriesId;
        this.seriesName = seriesName;
    }
    seriesId: string;
    seriesName: string;
}
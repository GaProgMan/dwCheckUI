export class Book implements IBook {
    constructor(bookName: string, bookIsbn10: string, bookIsbn13:
                string, bookDescription: string, bookCoverImageUrl: string){
        this.bookName = bookName;
        this.bookIsbn10 = bookIsbn10;
        this.bookIsbn13 = bookIsbn13;
        this.bookDescription = bookDescription;
        this.bookCoverImageUrl = bookCoverImageUrl;
    }

    bookName: string;
    bookIsbn10: string;
    bookIsbn13: string;
    bookDescription: string;
    bookCoverImageUrl: string;
}
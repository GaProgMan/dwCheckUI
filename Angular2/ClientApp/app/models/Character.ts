export class Character {
    constructor(characterName: string, books: { [key: number]: string }) {
        this.characterName = characterName;

        if (books) {
            this.books = [];
            for (let key in books) {
                let value = books[key];
                this.books.push(new BookIdNameViewModel(key, value));
            }
        }
        
        this.registerFunctions();
    }
    characterName: string;
    books: BookIdNameViewModel[];
    booksWithLineBreaksAndAnchors: () => string;
    
    registerFunctions = () => {
        this.booksWithLineBreaksAndAnchors = (): string =>{
            if (this.books.length == 0) {
                return '';
            }
            
            let returnString = '';
            for(let index = 0; index < this.books.length; index++) {
                let bookRecord = this.books[index];
                returnString +=
                    `<a href='/bookProfile/${bookRecord.bookId}'>${bookRecord.bookName}</a></br>`;
            }
            return returnString;
        }
    }
}

export class BookIdNameViewModel {
    constructor(bookId: string,  bookName: string) {
        this.bookId = bookId;
        this.bookName = bookName;
    }
    bookId: string;
    bookName: string;
}
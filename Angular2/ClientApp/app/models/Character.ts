export class Character {
    constructor(characterName: string, books: string[]) {
        this.characterName = characterName;
        this.books = books;
        
        this.registerFunctions();
    }
    characterName: string;
    books: string[];
    booksAsString: () => string;
    
    registerFunctions = () => {
        this.booksAsString = (): string =>{
            return this.books.length > 0
                ? this.books.join(',')
                : '';
        }
    }
}
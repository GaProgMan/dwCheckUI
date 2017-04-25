export class Character implements ICharacter {
    constructor(characterName: string, books: string[]){
        this.characterName = characterName;
        this.books = books;

        this.booksAsString = (): string =>{
            return books.map(b => b).join(', ');
        }
    }
    characterName: string;
    books: string[];
    booksAsString: () => string;
}
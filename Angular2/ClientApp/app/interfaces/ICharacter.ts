interface ICharacter {
    characterName: string;
    books: string[];

    booksAsString:() => string;
}
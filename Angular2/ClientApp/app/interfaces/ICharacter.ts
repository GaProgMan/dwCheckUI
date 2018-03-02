export interface IApiCharacter {
    characterName: string;
    books: { [key: number]: string };
}
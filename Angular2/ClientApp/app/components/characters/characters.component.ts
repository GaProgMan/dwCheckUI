﻿import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'characters',
    templateUrl: './characters.component.html'
})
export class CharacterComponent {
    constructor(http: Http) {
        this.http = http;

        this.success = true;
        this.loading = false;
        this.baseApiUrl =  'http://dwcheckapi.azurewebsites.net/Characters/Search?searchString=';
        this.registerFunctions();
    }
    // private vars
    private http: Http;

    // public bound vars
    success: boolean;
    loading: boolean;
    baseApiUrl: string;
    searchString = '';
    characters: ICharacter[];

    // public functions
    getDwCharacter: () => void;

    private registerFunctions() {
        this.getDwCharacter = () => {
            this.success = false;
            var route = `${this.baseApiUrl}${this.searchString}`;
            this.http.get(route).subscribe((result) => {
                var resultJson = result.json() as ResultJson;
                if(resultJson.success) {
                    this.success = true;
                    this.characters = new Array<ICharacter>();
                    result.json().result.forEach(element => {
                        this.characters.push(new Character(element.characterName, element.books));
                    });
                }
            });
        }
    }
}

interface ResultJson{
    success: boolean;
    result: string;
}

class Character implements ICharacter {
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

interface ICharacter {
    characterName: string;
    books: string[];

    booksAsString:() => string;
}
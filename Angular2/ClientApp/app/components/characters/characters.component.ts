import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ResultJson } from "../../models/ResultJson";
import { Character } from "../../models/Character";

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
    loading: boolean;
    success: boolean;
    baseApiUrl: string;
    searchString = '';
    characters: Character[];

    // public functions
    getDwCharacter: () => void;

    private registerFunctions() {
        this.getDwCharacter = () => {
            var route = `${this.baseApiUrl}${this.searchString}`;
            this.loading = true;
            this.http.get(route).subscribe((result) => {
                var resultJson = result.json() as ResultJson;
                if(resultJson.success) {
                    this.characters = [];
                    result.json().result.forEach((character:ApiCharacter) => {
                        this.characters.push(new Character(character.characterName,  character.books));
                    });
                }
                this.success = resultJson.success;
                this.loading = false;
            });
        }
    }
}

interface ApiCharacter {
    characterName: string;
    books: string[];
}
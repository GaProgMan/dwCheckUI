import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ResultJson } from "../../models/ResultJson";
import { Character } from "../../models/Character";
import {BaseComponent} from "../base/base.component";
import {IApiCharacter} from "../../interfaces/ICharacter";

@Component({
    selector: 'characters',
    templateUrl: './characters.component.html'
})
export class CharacterComponent extends BaseComponent{
    constructor(http: Http) {
        super();
        
        this.http = http;

        this.success = true;
        this.loading = false;
        this.registerFunctions();
    }
    // private vars
    private http: Http;

    // public bound vars
    loading: boolean;
    success: boolean;
    baseApiUrl: string;
    searchString = '';
    hasCharacters = false;
    characters: Character[];

    // public functions
    getDwCharacter: () => void;

    private registerFunctions() {
        this.getDwCharacter = () => {
            let route = `${this.characterSearchBaseUrl(this.searchString)}`;
            this.loading = true;
            this.http.get(route).subscribe((result) => {
                let resultJson = result.json() as ResultJson;
                if(resultJson.success) {
                    this.characters = [];
                    result.json().result.forEach((character:IApiCharacter) => {
                        this.characters.push(new Character(character.characterName, character.books));
                    });
                }
                
                this.hasCharacters = this.characters && this.characters.length > 0;
                this.success = resultJson.success;
                this.loading = false;
            });
        };
    }
}


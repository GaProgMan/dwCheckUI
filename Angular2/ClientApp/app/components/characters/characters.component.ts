import { Component } from '@angular/core';
import {Http, Response} from '@angular/http';
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
        super(http);
        
        this.http = http;

        this.success = true;
        this.loading = false;
        this.registerFunctions();
    }
    
    // public bound vars
    loading: boolean;
    success: boolean;
    baseApiUrl: string;
    searchString = '';
    hasCharacters = false;
    characters: Character[];

    getDwCharacters: () => void;
    private processCharactersCallback: (response: Response, success: boolean) => void;

    private registerFunctions() {
        this.processCharactersCallback = (response: Response, success: boolean) => {
            if(success) {
                this.characters = [];
                response.json().result.forEach((character:IApiCharacter) => {
                    this.characters.push(new Character(character.characterName, character.books));
                });
            }

            this.hasCharacters = this.characters && this.characters.length > 0;
            this.success = success;
            this.loading = false;
        };
        
        this.getDwCharacters = () => {
            let route = `${this.characterSearchBaseUrl(this.searchString)}`;
            this.loading = true;
            this.performXhr(route, this.processCharactersCallback);
        };
    }
}


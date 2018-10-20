import {HttpClient, HttpResponse} from '@angular/common/http';
import { Component } from '@angular/core';

import {IApiCharacter} from "../../interfaces/ICharacter";
import { Character } from "../../models/Character";
import { ResultJson } from "../../models/ResultJson";
import {BaseComponent} from "../base/base.component";

@Component({
    selector: 'characters',
    templateUrl: './characters.component.html'
})
export class CharacterComponent extends BaseComponent{
    constructor(private http: HttpClient) {
        super(http);

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
    private processCharactersCallback: (response: HttpResponse<any>, success: boolean) => void;

    private registerFunctions() {
        this.processCharactersCallback = (response: HttpResponse<any>, success: boolean) => {
            if(success) {
                this.characters = [];
                (response.body as any[]).forEach((character:IApiCharacter) => {
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

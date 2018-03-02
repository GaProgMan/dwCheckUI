import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ResultJson } from "../../models/ResultJson";
import { Series } from "../../models/Series";
import {BaseComponent} from "../base/base.component";
import {IApiSeries} from "../../interfaces/ISeries";

@Component({
    selector: 'series',
    templateUrl: './series.component.html'
})
export class SeriesComponent extends BaseComponent {
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
    success: boolean;
    loading: boolean;
    baseApiUrl: string;
    searchString = '';
    hasSeries = false;
    series: Series[];

    // public functions
    getDwSeries: () => void;

    private registerFunctions() {
        this.getDwSeries = () => {
            let route = `${this.seriesSearchBaseUrl(this.searchString)}`;
            this.loading = true;
            this.http.get(route).subscribe((result) => {
                let resultJson = result.json() as ResultJson;
                if(resultJson.success) {
                    this.series = [];
                    result.json().result.forEach((series:IApiSeries) => {
                        this.series.push(new Series(series.seriesId, series.seriesName, series.bookNames));
                    });
                }
                
                this.hasSeries = this.series && this.series.length > 0;
                this.success = resultJson.success;
                this.loading = false;
            });
        };
    }
}
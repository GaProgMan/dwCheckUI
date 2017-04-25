import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ResultJson } from "../../models/ResultJson";
import { Series } from "../../models/Series";

@Component({
    selector: 'series',
    templateUrl: './series.component.html'
})
export class SeriesComponent {
    constructor(http: Http) {
        this.http = http;

        this.success = true;
        this.loading = false;
        this.baseApiUrl =  'http://dwcheckapi.azurewebsites.net/series/search?searchString';
        this.registerFunctions();
    }
    // private vars
    private http: Http;

    // public bound vars
    success: boolean;
    loading: boolean;
    baseApiUrl: string;
    searchString = '';
    series: ISeries[];

    // public functions
    getDwSeries: () => void;

    private registerFunctions() {
        this.getDwSeries = () => {
            this.success = false;
            var route = `${this.baseApiUrl}${this.searchString}`;
            this.http.get(route).subscribe((result) => {
                var resultJson = result.json() as IResultJson;
                if(resultJson.success) {
                    this.success = true;
                    this.series = new Array<ISeries>();
                    result.json().result.forEach(element => {
                        this.series.push(new Series(element.seriesName, element.bookNames));
                    });
                }
            });
        }
    }
}
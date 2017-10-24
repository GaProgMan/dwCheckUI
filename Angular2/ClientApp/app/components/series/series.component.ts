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
        this.baseApiUrl =  'http://dwcheckapi.azurewebsites.net/series/search?searchString=';
        this.registerFunctions();
    }
    // private vars
    private http: Http;

    // public bound vars
    success: boolean;
    loading: boolean;
    baseApiUrl: string;
    searchString = '';
    series: Series[];

    // public functions
    getDwSeries: () => void;

    private registerFunctions() {
        this.getDwSeries = () => {
            var route = `${this.baseApiUrl}${this.searchString}`;
            this.loading = true;
            this.http.get(route).subscribe((result) => {
                var resultJson = result.json() as ResultJson;
                if(resultJson.success) {
                    this.series = [];
                    result.json().result.forEach((series:ApiSeries) => {
                        this.series.push(new Series(series.seriesId, series.seriesName, series.bookNames));
                    });
                }
                this.success = resultJson.success;
                this.loading = false;
            });
        }
    }
}

interface ApiSeries {
    seriesId: number;
    seriesName: string;
    bookNames: string[];
}
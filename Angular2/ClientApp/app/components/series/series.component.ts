import { Component } from '@angular/core';
import {Http, Response} from '@angular/http';
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
        super(http);
        
        this.http = http;

        this.success = true;
        this.loading = false;
        this.registerFunctions();
    }
    
    success: boolean;
    loading: boolean;
    searchString = '';
    hasSeries = false;
    series: Series[];
    
    getDwSeries: () => void;
    private processSeriesCallback: (response: Response, success: boolean) => void;

    private registerFunctions() {
        
        this.processSeriesCallback = (response: Response, success: boolean) =>  {
            if(success) {
                this.series = [];
                response.json().result.forEach((series:IApiSeries) => {
                    this.series.push(new Series(series.seriesId, series.seriesName, series.bookNames));
                });
            }

            this.hasSeries = this.series && this.series.length > 0;
            this.success = success;
            this.loading = false;
        };
        
        this.getDwSeries = () => {
            let route = `${this.seriesSearchBaseUrl(this.searchString)}`;
            this.loading = true;
            this.performXhr(route, this.processSeriesCallback);
        };
    }
}
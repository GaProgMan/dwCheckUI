import {HttpClient, HttpResponse} from '@angular/common/http';
import { Component } from '@angular/core';

import {IApiSeries} from "../../interfaces/ISeries";
import { ResultJson } from "../../models/ResultJson";
import { Series } from "../../models/Series";
import {BaseComponent} from "../base/base.component";

@Component({
    selector: 'series',
    templateUrl: './series.component.html'
})
export class SeriesComponent extends BaseComponent {
    constructor(http: HttpClient) {
        super(http);

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
    private processSeriesCallback: (response: HttpResponse<any>, success: boolean) => void;

    private registerFunctions() {
        
        this.processSeriesCallback = (response: HttpResponse<any>, success: boolean) =>  {
            if(success) {
                this.series = [];
                (response.body as any[]).forEach((series:IApiSeries) => {
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
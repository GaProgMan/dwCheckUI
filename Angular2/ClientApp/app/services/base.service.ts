import 'rxjs/add/observable/of'

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from "rxjs/Observable";
import { map, switchMap, tap } from 'rxjs/operators'

export abstract class BaseService {

    protected apiIsRunning = new BehaviorSubject<boolean>(false)
    
    constructor(protected http: HttpClient) { }
    
    
    checkApiIsRunning(options = {force: false}): Observable<boolean> {
        if (!this.apiIsRunning.value || options.force) {
            return this.http.get<string>(this.versionUrl).pipe(
                map(version => version != null), 
                tap(isUp => this.apiIsRunning.next(isUp)))
        } else {
            return this.apiIsRunning.asObservable()
        }
    }

    makeSafeCall<T>(url: string): Observable<T> {
        return this.checkApiIsRunning().pipe(switchMap(
            isUp => {
                if (isUp) {
                    return this.http.get<T>(url)
                 } else {
                     throw('Service is down')
                 }
            }
        ))
    }
    
    protected get apiBaseUrl(): string {
        return `${window.location.protocol}//dwcheckapi.azurewebsites.net/`;
    }

    get versionUrl(): string {
        return `${this.apiBaseUrl}version`;
    }
}
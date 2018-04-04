import { Injectable, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable } from 'rxjs/Observable';
import { Http, Response, BaseRequestOptions } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpMsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DishService{
    constructor(public http : Http,
                private processHttpMsgService : ProcessHttpMsgService){}

    getDishes() : Observable<Dish[]>{
        return this.http.get(baseURL + "dishes")
                        .map(res => {return this.processHttpMsgService.extractData(res)})
                        .catch(err => {return this.processHttpMsgService.handleError(err)});
    }

    getDish(id : number) : Observable<Dish>{
        return this.http.get(baseURL + "dishes/" + id)
                        .map(res => {return this.processHttpMsgService.extractData(res)})
                        .catch(err => {return this.processHttpMsgService.handleError(err)});
    }

    getFeaturedDish() : Observable<Dish>{
        return this.http.get(baseURL + "dishes?featured=true")
                        .map(res => {return this.processHttpMsgService.extractData(res)[0]})
                        .catch(err => {return this.processHttpMsgService.handleError(err)});
    }
}
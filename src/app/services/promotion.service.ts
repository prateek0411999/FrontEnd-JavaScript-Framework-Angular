import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';
//import {PROMOTIONS} from '../shared/promotions';
import {Observable,of} from'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {delay, catchError} from 'rxjs/operators';
import {ProcessHTTPMsgService} from './process-httpmsg.service';
//import { Portal } from '@angular/cdk/portal';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
    private processHTTPMsgService : ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]> {
    // return of(PROMOTIONS).pipe(delay(2000));
    // ;
    return this.http.get<Promotion[]>(baseURL+ 'promotions').pipe(catchError(this.processHTTPMsgService.handleError));
  
  }


  getPromotion(id: string ): Observable<Promotion>{
    //return of(PROMOTIONS.filter((promo)=>{ promo.id === id} ) [0]).pipe(delay(2000));    
    return this.http.get<Promotion>(baseURL+ 'promotions'+ id).pipe(catchError(this.processHTTPMsgService.handleError));
  }
  //javascript ka function hh filter preceeded by arrow function yeh [0] select krne k liye
  getFeaturedPromtion(): Observable<Promotion>{
    //return of(PROMOTIONS.filter((promo)=> promo.featured)[0]).pipe(delay(2000));
    return this.http.get<Promotion[]>(baseURL +'promotions?featured=true')
    .pipe(map(promotions=> promotions[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));



  }
}

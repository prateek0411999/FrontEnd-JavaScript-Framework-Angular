import { Injectable } from '@angular/core';
import { Dish }from '../shared/dish';
//import{ DISHES } from '../shared/dishes';
//ab apan http ka use kr rhe json server se data lene ko 
//toh hme app yeh shared folder wale dishes object ki jarut hh nhi toh 
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {map,catchError} from 'rxjs/operators';
import { Observable,of }from 'rxjs';
import {delay} from 'rxjs/operators';
import {ProcessHTTPMsgService} from './process-httpmsg.service';
 @Injectable({
   providedIn: 'root',
 })

// @Injectable()
// export class DishService {

//   constructor() { }
//   getDishes(): Dish[] {
//     return DISHES;
//   }


//   getDish(id: number ):Dish{
//     return DISHES.filter((dish)=>{ dish.id === id} )[0];
    
//   }
//   //javascript ka function hh filter preceeded by arrow function yeh [0] select krne k liye
//   getFeaturedDish(): Dish{
//     return DISHES.filter((dish)=> dish.featured)[0];


//   }
// }



// @Injectable()
// export class DishService {

//   constructor() { }

//   getDishes(): Dish[] {
//     return DISHES;
//   }

//   getDish(id: number): Dish {
//     return DISHES.filter((dish) => (dish.id === id))[0];
//   }

//   getFeaturedDish(): Dish {
//     return DISHES.filter((dish) => dish.featured)[0];
//   }
// }
//involving promise






// @Injectable()
// export class DishService {

//   constructor() { }

//   getDishes(): Promise<Dish[]> {
//    // return Promise.resolve(DISHES);
//     //this works well if you have the results immediately available with you
//     //return new Promise(resolve => {
//       //simulate server latenct with 2 sec delay
//       //setTimeout(()=> resolve(DISHES), 2000)
//     //});
//  // }

//  return of(DISHES).pipe(delay(2000)).toPromise();
  
// //  My service is now updated to return promises from an observable here.
// // So, with this update,
// // my dish service is updated to make use of observables rather
// // than directly using the values
//   }


//   getDish(id: number): Promise<Dish> {
//   //   return new Promise(resolve => {
//   //     //simulate server latenct with 2 sec delay
//   //     setTimeout(()=> resolve(DISHES.filter((dish) => (dish.id === id))[0]),2000);
//   // });

//   return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000)).toPromise();
//   }


//   getFeaturedDish(): Promise<Dish> {
//     return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000)).toPromise();
    
//   }
// }

// Obviously, this also means that I need to go to
// my components and then reconfigure the components to be able to deal
// with the fact that they are not receiving the data
// immediately instead they are receiving a promise and then they
// will have to implement the then method within
// which the promise when it results will deliver the data to you.







// Returning to our services,
// you can now remove the toPromise first by removing
// the toPromise operator because we don't need it
// anymore and then we will simply remove the toPromise from this,
// import observable and then instead let
// our method return
// observables instead of promises.
// So as I mentioned,
// whatever a promise can do an observable can also do.
// So, let's update all these to return observables. 

//ab apan promise ki jaga observable return kraeynge 
//kyuki jo ab apan http pdege usme yhi use hoga


@Injectable()
export class DishService {

  constructor( private http: HttpClient,
    private processHTTPMsgService : ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]> {
   // return Promise.resolve(DISHES);
    //this works well if you have the results immediately available with you
    //return new Promise(resolve => {
      //simulate server latenct with 2 sec delay
      //setTimeout(()=> resolve(DISHES), 2000)
    //});
 // }

 return this.http.get<Dish[]>(baseURL + 'dishes')
          .pipe(catchError(this.processHTTPMsgService.handleError));
  
//  My service is now updated to return promises from an observable here.
// So, with this update,
// my dish service is updated to make use of observables rather
// than directly using the values
  }


  getDish(id: number): Observable<Dish> {
  //   return new Promise(resolve => {
  //     //simulate server latenct with 2 sec delay
  //     setTimeout(()=> resolve(DISHES.filter((dish) => (dish.id === id))[0]),2000);
  // });

  return this.http.get<Dish>(baseURL + 'dishes/'+ id).pipe(catchError(this.processHTTPMsgService.handleError));;
  
}


  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true')
      .pipe(map(dishes=> dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));

  
  }

  getDishIds(): Observable<number[] | any>{
    return this.getDishes().pipe(map(dishes => dishes.map(dish=> dish.id)))
        .pipe(catchError(error=> error));
  }

  putDish(dish: Dish): Observable<Dish>{
    const httpOptions= {
      headers: new HttpHeaders({
        // the first thing that we need to do is to set up some HTTP options so that we inform
        // the server on what
        // is being sent in the message here.
        // So, we'll set up some headers information here.
        // So, for the headers, we'll set up new HttpHeaders here,
        // and in the new HttpHeaders,
        // let's set up the header as
        // Content-Type of the type application JSON.
        // So, we are specifying to our server that the incoming request message
        // contains the information in the form of
        // a json object in the body of the incoming request message.
        // So, the server will be able to extract
        // the Dish information from the body of the message, parse it,
        // and then be able to persist the modified Dish to the server,
        // and then send back the updated Dish information from the server side
        'Content-type': 'application/json'
      })
    };
    return this.http.put<Dish>(baseURL +'dishes/'+ dish.id, dish, httpOptions ).pipe(catchError(this.processHTTPMsgService.handleError));;
  }

}

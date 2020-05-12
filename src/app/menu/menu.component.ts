import { Component, OnInit, Inject } from '@angular/core';
import { Dish }from '../shared/dish';
//import{DISHES} from '../shared/dishes';
import {DishService} from '../services/dish.service';

import{flyInOut,expand} from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host:{
    '[@flyInOut]': 'true',
    'style': 'display: block;'

  },
  //Now, within the host, so this is how I ensure that this particular animation happens when route changes occur. So, within this host here, I supply this as saying, 
  animations: [
    flyInOut(),
    expand()
  ]
})
export class MenuComponent implements OnInit {

  constructor(private dishservice: DishService,
    //when you have a value,then you inject the value by using the "@Inject" decorator. 
    @Inject('BaseURL') private BaseURL
    ) { }

  ngOnInit() {
    // //this.dishes=this.dishservice.getDishes();
    // now,
    // the dishservice.getDishes is returning a promise and then here you have,
    // the promise being assigned to a dish array object and this is not correct.
    // How do we reconfigure this code?
    // So, as I mentioned,
    // when we reconfigure the code,
    // we need to implement the then and the catch for the getDishes. 
    
    this.dishservice.getDishes()
      .subscribe((dishes)=> this.dishes=dishes, errmess=> this.errMess = <any>errmess );

      //http client use krne k baad |||||||
      // The way we process the data that we obtained
      // from the service will remain exactly the same.
      // Because my service is still returning and observable,
      // and I am subscribing to the observable within this component.
      // So, that part doesn't change at all. 
  
  
  }

  //dishes: Dish[]= DISHES;
  dishes: Dish[];
  errMess: string;
  //selectedDish: dish=DISHES[0];
  //selectedDish: Dish;
  // onSelect(dish: Dish)
  // {
  //   this.selectedDish =dish;
  // }


 
}


// import { Component, OnInit } from '@angular/core';
// import {Dish} from '../shared/dish';
// import {DishService  } from "../services/dish.service";
// import {Promotion} from '../shared/promotion';
// import {PromotionService } from "../services/promotion.service";



// import { Leader } from '../shared/leader';
// import { LeaderService } from '../services/leader.service';
// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss']
// })
// export class HomeComponent implements OnInit {

//   dish: Dish;
//   promotion: Promotion;
  
//   constructor( private dishService: DishService,
//     private promotionService: PromotionService) { }

//   ngOnInit() {
//     this.dish=this.dishService.getFeaturedDish();
//     this.promotion=this.promotionService.getFeaturedPromtion();
//     this.Leader = this.LeaderService.getFeaturedLeader();
//   }

// }
import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import {flyInOut, expand} from '../animations/app.animation';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
    .subscribe(dish =>this.dish = dish);
    
    this.promotionservice.getFeaturedPromtion().subscribe(promotion =>this.promotion = promotion);

   this.leaderService.getFeaturedLeader()
   .subscribe(leader=>  this.leader = leader);
  }

}

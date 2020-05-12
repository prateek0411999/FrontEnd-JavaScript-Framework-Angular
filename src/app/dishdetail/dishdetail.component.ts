
import { Component, OnInit, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DishService } from '../services/dish.service';

import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import {switchMap }from 'rxjs/operators';

import { visibility, flyInOut,expand} from '../animations/app.animation';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],host:{
    '[@flyInOut]': 'true',
    'style': 'display: block;'

  },
  //Now, within the host, so this is how I ensure that this particular animation happens when route changes occur. So, within this host here, I supply this as saying, 
  animations: [
    flyInOut(),
    visibility(),
    expand()
  ]
 
    // * => *  * stands for any state that we defined so can be from shown to hidden or hidden to shown 
  //if I move from shown to hidden state or from hidden to shown state, I will move within 0.5 seconds, or 500 milliseconds. And then, I will do the transition by easing in and out, so it won't be a linear transition, it'll be slowly going in and then ease in and then ease out the transition
  
})
export class DishdetailComponent implements OnInit {

  dish: Dish;

  dishIds: number[];
  prev: number;
  next: number;
  commentForm: FormGroup;
  comment: Comment;

  dishCopy: Dish;

  visibility = 'shown';


  formErrors = {
    'author': '',
    'comment': ''
  };
  
  validationMessages = {
    'author': {
      'required':      'Author Name is required.',
      'minlength':     'Author Name must be at least 2 characters long.',
      'maxlength':     'Author Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Comment is required.',
      'minlength':     'Comment must be at least 1 characters long.'
    }
  };

  
  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location, 
    private fb:FormBuilder,
    @Inject('BaseURL') private BaseURL
    ) {
      this.createForm();
     }

  ngOnInit() {
    //let id = +this.route.snapshot.params['id']; // (+) converts string 'id' to a number
    
    //dishIds array m value direct function call krke toh nhi kr skte as it is an observable so
    this.dishservice.getDishIds()
      .subscribe((dishIds)  => this.dishIds =dishIds);
  
      this.route.params
      .pipe(switchMap((params: Params)=> { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); })) // (+) converts string 'id' to a number
      .subscribe(dish => { this.dish = dish; this.dishCopy=dish; this.setPrevNext(dish.id);

        this.visibility= 'shown'; //I will set the visibility to hidden so  that current dish that is being displayed in the view will hide itself. And then when the new dish becomes available, so that will happen when the subscribe is called when that observable becomes available.  And then, when the dish becomes available and then, I set this dish to the dish which came back from the observable. At that point, I will restore the visibility to that shown state.So, that my new dish that I have fetched can be shown on the screen With this change, I now go to the template file and within the template file I'm going to apply the visibility to both the dish here
      });
//dishCopy m bhi leli dish



//       notice how I'm taking one observable, the params observable,
// and then I'm mapping the params observable into another observable which is basically
// going in fetching the dish value from my dishService,
// and then making that available as an observable.
// Then, I'm subscribing to that observable here, and then thereby,
// I'm getting the dish value here,
// and then I'm mapping the dish value or rather
// making the dish variable equal to the dish value here.
// Notice how by using the observables,
// you are now able to take one observable then map it into another observable
  }


  setPrevNext(dishId: number){
    let index=this.dishIds.indexOf(dishId);
    this.prev=this.dishIds[(this.dishIds.length + index -1)% (this.dishIds.length)];
    this.next=this.dishIds[(this.dishIds.length+index+1)% this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }
  //comments k niche wale section ka  pura  code
  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      comment: ['', [Validators.required, Validators.minLength(1)] ],
      rating: 5
    });

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
    this.comment = form.value;
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.dishCopy.comments.push(this.comment);
    
    
    this.dishservice.putDish(this.dishCopy)
    .subscribe(dish =>{
      this.dish=dish;
      this.dishCopy=dish;

    }, errmess=> {this.dish=null; this.dishCopy=null; });
    
    
    console.log(this.comment);
    this.comment = null;
    this.commentForm.reset({
      author: '',
      comment: '',
      rating: 5
    });
  }

}



//earlier one
// export class DishdetailComponent implements OnInit {

//   dish: Dish;

//   constructor(private dishService: DishService,
//     private route: ActivatedRoute,
//     private location: Location) { }

//   ngOnInit() {
//     let id = this.route.snapshot.params['id'];
//     this.dish = this.dishService.getDish(id);
//   }

//   goBack(): void {
//     this.location.back();
//   }

// }
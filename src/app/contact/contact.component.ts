import { Component, OnInit, ViewChild  } from '@angular/core';

import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Feedback, ContactType} from '../shared/feedback';
import {flyInOut, expand} from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';


// @Component({
//   selector: 'app-contact',
//   templateUrl: './contact.component.html',
//   styleUrls: ['./contact.component.scss'],
//   host:{
//     '[@flyInOut]': 'true',
//     'style': 'display: block;'

//   },
//   //Now, within the host, so this is how I ensure that this particular animation happens when route changes occur. So, within this host here, I supply this as saying, 
//   animations: [
//     flyInOut(),
//     expand()
//   ]
// })
// export class ContactComponent implements OnInit {

//   feedbackForm: FormGroup;
//   //variable bna liya formgroup ka 
//   feedback: Feedback;
//   //yeh class ka variable bna liya
//   contactType=ContactType;
//   constructor(public fb: FormBuilder) { 
//     this.createForm();
//   }

//   ngOnInit() {
//   }

//   createForm(){
//     //ab apan form create krege using formBuilder variable fb that has a fucntion called as group
//     this.feedbackForm=this.fb.group({
//       firstname: '',
//       lastname: '',
//       telnum:0,
//       email: '',
//       agree: false,
//       contacttype: 'None',
//       message: '',

//     });
//   }
//   onSubmit(){
//     this.feedback=this.feedbackForm.value;
//     console.log(this.feedback);
//     this.feedbackForm.reset();
//   }


// }
// //so now we need to map this into the template file to view these 
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  feedbackCopy: Feedback = null;  
  contactType = ContactType;
  spinnerVisibility: boolean = false;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  constructor(private fb: FormBuilder,
    private feedbackService: FeedbackService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
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
  }

  onSubmit() {
    this.spinnerVisibility = true;
    this.feedbackCopy = this.feedbackForm.value;
    this.feedbackService.submitFeedback(this.feedbackCopy)
      .subscribe(feedback => 
        { setTimeout(() => 
          {
            this.feedback = feedback; this.spinnerVisibility = false; console.log(this.feedback); 
            setTimeout(() => this.feedback = null, 5000);
          }
          , 2000);
        }
      );
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }

}
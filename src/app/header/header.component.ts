import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import { LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-header',                 //selector apan ko include krna hota hh app.comp.html file m taki yeh component run ho
  templateUrl: './header.component.html',  // templateUrl btata hh file jo run hogi yeh component run hone p
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  openLoginForm(){
    this.dialog.open(LoginComponent, {width: '500px', height: '450px'})
  }

}

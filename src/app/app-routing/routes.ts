// import {Routes} from '@angular/router';


// import { HomeComponent } from '../home/home.component';
// import { AboutComponent } from '../about/about.component';
// import { ContactComponent } from '../contact/contact.component';
// import { MenuComponent } from '../menu/menu.component';
// import { DishdetailComponent } from '../dishdetail/dishdetail.component';

// export const routes: Routes=[
//     {path: 'home',component: HomeComponent},
//     //i.e. home p click krne p yeh component run hoga 
//     //as we have included in the footer as well
//     {path: 'menu',component: MenuComponent},
//     //{path: 'about',component: AboutComponent}
//     {path: '',redirectTo: '/home',pathMatch: 'full'}, //automatically redirect to home if someone press wrong
//     { path: 'contactus',     component: ContactComponent },
// //using the parameter id i.e. a selected dish
//     { path: 'dishdetail/:id',     component: DishdetailComponent },

// ];
import { Routes } from '@angular/router';

import { MenuComponent } from '../menu/menu.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'menu',     component: MenuComponent },
  { path: 'contactus',     component: ContactComponent },
  { path: 'aboutus',     component: AboutComponent },
  { path: 'dishdetail/:id',     component: DishdetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
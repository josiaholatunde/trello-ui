import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { BookingSubjectResolver } from '../resolvers/booking-subject.resolver';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
  {
    path: '',
    children: [
      {
        path: 'home',
        component: AppComponent,
        resolve: [ BookingSubjectResolver ]
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRouterModule { }

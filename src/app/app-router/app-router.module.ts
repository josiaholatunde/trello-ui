import { TestComponent } from './../components/test/test.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { BookingSubjectResolver } from '../resolvers/booking-subject.resolver';
import { HomeComponent } from '../components/home/home.component';


const routes: Routes = [
  {
    path: 'bookings/:name',
    component: HomeComponent,
    // resolve: [ BookingSubjectResolver ]
  },
  {
    path: 'home',
    component: HomeComponent,
    resolve: [ BookingSubjectResolver ]
  },
  {
    path: 'login',
    component: HomeComponent,
    resolve: [ BookingSubjectResolver ]
  },
  {
    path: 'register',
    component: HomeComponent,
    resolve: [ BookingSubjectResolver ]
  },
  {
    path: 'test',
    component: TestComponent
   // resolve: [ BookingSubjectResolver ]
  },
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch: 'full'},

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRouterModule { }

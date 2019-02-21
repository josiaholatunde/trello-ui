import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BookingSubjectService } from '../../services/booking-subject.service';
import { BookingSubjectType } from '../../models/booking-subject-type';
import { BookingSubject } from '../../models/booking-subject';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  isLoggedInStatus = false;
  passOn: any;
  bookingType = BookingSubjectType.Hotel;

  bookingSubject: BookingSubject[];
  currentBookingSubject: BookingSubject;
  isLoginClicked = false;
  isRegisterClicked = false;
  isModalClicked = false;
  display = false;
  routeParams: { display: string; value: string; imgIcon: string; }[];
  book: any;
  constructor(private bookingService: BookingSubjectService, private route: ActivatedRoute,
    private router: Router) {
    this.bookingSubject = [];
    this.book = this.route.url.subscribe(res => {
      console.log('I changed', res[1].path);
      this.bookingType = BookingSubjectType[res[1].path];
    });
  }
  ngOnInit(): void {
    console.log('home oninit');

    if (this.router.url === '/login') {
      this.isRegisterClicked = false;
      this.isLoginClicked = true;
    } else if (this.router.url === '/register') {
      this.isLoginClicked = false;
      this.isRegisterClicked = true;
    } else {
      this.isLoginClicked = false;
      this.isRegisterClicked = false;
      this.isLoggedInStatus = false;
    }
    this.loadBookingSubjects();
    this.routeParams = [
      {display: 'Hotel', value: BookingSubjectType[BookingSubjectType.Hotel], imgIcon: 'icon-home'},
      {display: 'Flight', value: BookingSubjectType[BookingSubjectType.Flight], imgIcon: 'icon-aircraft-take-off'},
      {display: 'Car rental', value: BookingSubjectType[BookingSubjectType.CarRental], imgIcon: 'icon-key'},
      {display: 'Tours', value: BookingSubjectType[BookingSubjectType.Tour], imgIcon: 'icon-map'},
    ];
  }

  loadBookingSubjects($event?: any) {
   // const test = this.getBookingTypeFromRoute();
    console.log('Typeee', this.bookingType);
    this.bookingService.getBookingSubjects(this.bookingType, $event).subscribe((res: BookingSubject[]) => {
      this.bookingSubject = res;
      console.log('Res', res);
      this.currentBookingSubject = res[0];
    });
  }

  getBookingTypeFromRoute() {
    this.route.params.subscribe(param => {
      if (param['name']) {
       if (param['name'] === 'Hotel') {
         this.bookingType = BookingSubjectType.Hotel;
       } else  if (param['name'] === 'CarRental') {
         this.bookingType = BookingSubjectType.CarRental;
       } else  if (param['name'] === 'Tour') {
         this.bookingType = BookingSubjectType.Tour;
       }  else  if (param['name'] === 'Flight') {
         this.bookingType = BookingSubjectType.Flight;
       } else {
         this.bookingType = BookingSubjectType.Hotel;
       }
      }
      return this.bookingType;
     });
  }

  updateBookingType($event) {
    this.bookingType = $event;
  }


  updateBookingSubject($event: any) {
    this.bookingSubject = $event;
    this.currentBookingSubject = this.bookingSubject[0];
    console.log('From Home ', this.bookingSubject);
    console.log('From Home Alone', this.bookingSubject[0]);
  }

  updateIndividualBookingSubject($event: any) {
    this.currentBookingSubject = $event;
  }
  getBookingSubject($event: any) {
    this.loadBookingSubjects($event);
  }
  reset($event) {
    this.isLoginClicked = false;
    this.isRegisterClicked = false;
  }
  update ($event) {
    this.isLoginClicked = false;
    this.isRegisterClicked = false;
    this.isLoggedInStatus = true;
    console.log(' I came', this.isLoggedInStatus);
  }
  log($event) {
    this.passOn = $event;
  }
  openModal($event) {
    this.isModalClicked = true;
    this.display = true;
  }

  ngOnDestroy(): void {
    this.book.unsubscribe();
 }

}

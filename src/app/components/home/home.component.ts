import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BookingSubjectService } from '../../services/booking-subject.service';
import { BookingSubjectType } from '../../models/booking-subject-type';
import { BookingSubject } from '../../models/booking-subject';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bookingType = BookingSubjectType.Hotel;
  bookingSubject: BookingSubject[];
  currentBookingSubject: BookingSubject;
  isLoginClicked = false;
  isRegisterClicked = false;
  constructor(private bookingService: BookingSubjectService, private route: ActivatedRoute, private router: Router) {
    this.bookingSubject = [];
  }
  ngOnInit(): void {
    if (this.router.url === '/login') {
      this.isRegisterClicked = false;
      this.isLoginClicked = true;
    } else if (this.router.url === '/register') {
      this.isLoginClicked = false;
      this.isRegisterClicked = true;
    } else {
      // this.loadBookingSubjects();
      this.isLoginClicked = false;
      this.isRegisterClicked = false;
    }
    this.loadBookingSubjects();
  }
  loadBookingSubjects($event?: any) {
    this.getBookingTypeFromRoute();
    this.bookingService.getBookingSubjects(this.bookingType, $event).subscribe((res: BookingSubject[]) => {
      this.bookingSubject = res;
      this.currentBookingSubject = res[0];
    });
  }

  getBookingTypeFromRoute() {
    this.route.paramMap.subscribe(param => {
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
     });
  }

  updateBookingSubject($event: any) {
    this.bookingSubject = $event;
    this.currentBookingSubject = this.bookingSubject[0];
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
}

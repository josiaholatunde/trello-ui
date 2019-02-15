import { Component, OnInit } from '@angular/core';
import { BookingSubjectService } from './services/booking-subject.service';
import { BookingSubjectType } from './models/booking-subject-type';
import { BookingSubject } from './models/booking-subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'trello-ui';
  bookingType = BookingSubjectType.Hotel;
  bookingSubject: BookingSubject[];
  currentBookingSubject: BookingSubject;
  constructor(private bookingService: BookingSubjectService) {
    this.bookingSubject = [];
  }
  ngOnInit(): void {
    this.bookingService.getBookingSubjects(this.bookingType).subscribe((res: BookingSubject[]) => {
      this.bookingSubject = res;
      this.currentBookingSubject = res[0];
      console.log('Current', this.currentBookingSubject);
    });
  }

  updateBookingSubject($event: any) {
    this.bookingSubject = $event;
    this.currentBookingSubject = this.bookingSubject[0];
  }
}

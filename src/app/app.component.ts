import { Component, OnInit } from '@angular/core';
import { BookingSubjectService } from './services/booking-subject.service';
import { BookingSubjectType } from './models/booking-subject-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'trello-ui';
  bookingType: BookingSubjectType;
  bookingSubject: any[];
  currentBookingSubject: any;
  constructor(private bookingService: BookingSubjectService) {
    this.bookingSubject = [];
  }
  ngOnInit(): void {
    this.bookingService.getBookingSubjects(this.bookingType).subscribe((res: any[]) => {
      this.bookingSubject = res;
      this.currentBookingSubject = res[0];
      console.log('Current', this.currentBookingSubject);
    });
  }
}

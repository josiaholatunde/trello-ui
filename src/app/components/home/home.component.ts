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

}

import { Component, OnInit } from '@angular/core';
import { BookingSubjectType } from 'src/app/models/booking-subject-type';
import { ActivatedRoute } from '@angular/router';
import { BookingSubjectService } from 'src/app/services/booking-subject.service';
import { BookingSubject } from 'src/app/models/booking-subject';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchParams: any = {};
  currentBookingType: BookingSubjectType;
  bookingSubjects: BookingSubject[];
  constructor(private route: ActivatedRoute, private bookingService: BookingSubjectService) { }

  ngOnInit() {
  }
  onHandleSelect($event: any) {
    console.log('You clicked');
    console.log('Event', $event);
  }
  filterBookingSubject(event) {
    const query = event.query;
    // type from route params
    const bookingType = BookingSubjectType.Hotel;
    this.bookingService.getBookingSubjects(bookingType, query).subscribe((res: BookingSubject[]) => {
      this.bookingSubjects = res;
      console.log(res);
    });
  }

}

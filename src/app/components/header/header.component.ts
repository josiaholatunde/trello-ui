import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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
  @Output() bookingTypeSearchInputChange = new EventEmitter();
  currentBookingType: BookingSubjectType;
  bookingSubjects: BookingSubject[];
  isLoggedIn = true;
  constructor(private route: ActivatedRoute, private bookingService: BookingSubjectService) { }

  ngOnInit() {
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
  getBookingSubjects() {
    this.bookingTypeSearchInputChange.emit(this.searchParams.name);
  }

}

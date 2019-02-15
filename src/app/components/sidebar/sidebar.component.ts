import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BookingSubjectService } from 'src/app/services/booking-subject.service';
import { BookingSubjectType } from 'src/app/models/booking-subject-type';
import { BookingSubject } from 'src/app/models/booking-subject';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() bookingSubjectChange = new EventEmitter();
  bookingType: BookingSubjectType;
  constructor(private bookingService: BookingSubjectService, private router: Router) { }

  ngOnInit() {
  }
  getBookingSubject(bookingType: BookingSubjectType) {
    this.bookingService.getBookingSubjects(bookingType).subscribe((res: BookingSubject[]) => {
     this.bookingSubjectChange.emit(res);
     this.router.navigate(['bookings', this.bookingType]);
    });
  }

}

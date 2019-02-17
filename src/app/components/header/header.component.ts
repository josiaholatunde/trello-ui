import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { BookingSubjectType } from 'src/app/models/booking-subject-type';
import { ActivatedRoute, Router } from '@angular/router';
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
  @Input() isLoggedInStatusProperty;
  @Input() propertyToPassOn: any;
  currentBookingType: BookingSubjectType;
  bookingSubjects: BookingSubject[];
  isLoggedIn = false;
  loggedInUser: any;
  constructor(private route: ActivatedRoute, private router: Router, private bookingService: BookingSubjectService) { }

  ngOnInit() {
  /*   this.route.paramMap.subscribe(param => {
      if (param['status']) {
        this.isLoggedIn = true;
        console.log('ogo', param['status']);
      }
      console.log('I didnt run', param['status']);
    }); */
    if (this.router.url.endsWith('true')) {
      this.isLoggedIn = true;
      const user = JSON.parse(localStorage.getItem('user'));
      this.loggedInUser = user;
    }
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
  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

}

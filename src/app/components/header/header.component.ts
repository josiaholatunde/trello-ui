import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { BookingSubjectType } from 'src/app/models/booking-subject-type';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingSubjectService } from 'src/app/services/booking-subject.service';
import { BookingSubject } from 'src/app/models/booking-subject';
import { UserService } from 'src/app/services/user.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchParams: any = {};
  @Output() bookingTypeSearchInputChange = new EventEmitter();
  @Output() bookingSubjectChange = new EventEmitter();

  @Input() isLoggedInStatusProperty;
  @Input() propertyToPassOn: any;
  @Input() bookingTypePassed: any;
  currentBookingType: BookingSubjectType;
  bookingSubjects: BookingSubject[];
  isLoggedIn = false;
  loggedInUser: any;
  bookingType: string;
  paramName: any;
  type: any;
  testProps: string;
  routePath: string;
  defaultPhotoUrl: string;
  constructor(private route: ActivatedRoute, private router: Router, private bookingService: BookingSubjectService,
    private alertifyService: AlertifyService, private userService: UserService) {
   }

  getBookingSubject(bookingType: any) {
   // this.isLoggedInAndRegisterChange.emit(false);
    this.bookingService.getBookingSubjects(bookingType).subscribe((res: BookingSubject[]) => {
     this.bookingSubjectChange.emit(res);
    }, err => this.alertifyService.error(err));
  }

  ngOnInit() {
    this.bookingService.defaultBookingTypeObservable.subscribe(type => {
      this.bookingType = BookingSubjectType[type];
    });
    this.userService.defaultPhotoUrlObservable.subscribe(ph => this.defaultPhotoUrl = ph);

    this.setBookingType();
    this.getBookingSubject(this.bookingType);
    this.userService.defaultLoggedInStatus.subscribe(status => {
      this.loggedInUser = this.userService.getLoggedInUser();
      this.isLoggedIn = status;
    });

    this.route.paramMap.subscribe(param => {
      if (param['status']) {
        this.isLoggedIn = true;
        console.log('ogo', param['status']);
      }
      console.log('I didnt run', param['status']);
    });
    if (this.router.url.endsWith('true')) {
        this.isLoggedIn = true;
        const user = JSON.parse(localStorage.getItem('user'));
        this.loggedInUser = user;
      }
      console.log('I executed');
  }
  setBookingType(): any {
    if (this.paramName === 'Hotel') {
      this.bookingType = BookingSubjectType[BookingSubjectType.Hotel];
    } else  if (this.paramName === 'CarRental') {
      this.bookingType = BookingSubjectType[BookingSubjectType.CarRental];
    } else  if (this.paramName === 'Tour') {
      this.bookingType = BookingSubjectType[BookingSubjectType.Tour];
    }  else  if (this.paramName === 'Flight') {
      this.bookingType = BookingSubjectType[BookingSubjectType.Flight];
    } else {
      this.bookingType = BookingSubjectType[BookingSubjectType.Hotel];
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
    this.userService.changeLoggedInStatus(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  getDefaultPhoto() {
    return this.userService.defPhoto;
  }

}

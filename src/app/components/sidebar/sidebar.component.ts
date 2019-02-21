import { BookingSubjectType } from './../../models/booking-subject-type';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BookingSubjectService } from 'src/app/services/booking-subject.service';
import { BookingSubject } from 'src/app/models/booking-subject';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserRole } from 'src/app/models/UserRole';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() isLoggedInAndRegisterChange = new EventEmitter();
  @Output() isCreatedBookingChange = new EventEmitter();
  @Input() routeParams: any[];
  /* @Output() bookingTypeChange = new EventEmitter<BookingSubjectType>(); */
  bookingType: BookingSubjectType;
  loggedInUser: any;
  isUserAdmin: boolean;
  IsUserLoggedIn = false;
  constructor(private bookingService: BookingSubjectService, private userService: UserService, private alertify: AlertifyService,
    private router: Router) {
      console.log('Eyo');
    }

  ngOnInit() {
   this.userService.loggedInStatus.subscribe(status => {
      this.IsUserLoggedIn = status;
   });
    this.loggedInUser = this.userService.getLoggedInUser();
    if (this.loggedInUser) {
      if (this.loggedInUser.userRole === UserRole.Admin) {
        this.isUserAdmin = true;
      }
    }
    console.log('logged', this.IsUserLoggedIn);
  }

  getLoggedInUser() {
    if (this.userService.isUserLoggedIn()) {
      this.IsUserLoggedIn = true;
    }
    console.log('Ad', this.loggedInUser);
  }
  createBooking() {
    this.isCreatedBookingChange.emit(true);
  }


}

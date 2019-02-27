import { Comment } from './../../models/Comment';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { BookingSubject } from 'src/app/models/booking-subject';
import { BookingSubjectType } from 'src/app/models/booking-subject-type';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  @Input() bookingSubject: BookingSubject;
  @Output() bookingSubjectChange = new EventEmitter();
  @Input() allBooking: BookingSubject[];
  nameOfRecommender: string;
  bookingType: string;
  greyRightButton = false;
  greyLeftButton = true;
  display = false;
  loggedInUser: any;
  isLoggedIn: boolean;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
   // this.bookingSubject.comments = this.bookingSubject.comments[0];
   this.bookingSubject.comments.splice(2, 1000);
   // this.bookingSubject.comments = [...this.bookingSubject.comments];
   // this.bookingSubject.comments = this.bookingSubject.comments.splice(0, 2);
    this.bookingType = BookingSubjectType[this.bookingSubject.bookingType];
    this.userService.defaultLoggedInStatus.subscribe(status => {
      this.loggedInUser = this.userService.getLoggedInUser();
      this.isLoggedIn = status;
    });
    /* const minValue = 0;
    const maxValue = this.bookingSubject.comments.length - 1;
    let comment: Comment;
    for (let i = 0; i < 1; i++) {
      comment = this.bookingSubject.comments[this.generateRandomNumber(minValue, maxValue)];
      this.bookingComments.push(comment);
    } */
    console.log('book Comments', this.bookingSubject);
  }

  generateRandomNumber(minValue, maxValue) {
    return Math.floor(Math.random() * (maxValue - minValue) + minValue);
  }
  loadNextBookingSubject() {
    let indexOfBookingSubject = this.allBooking.indexOf(this.bookingSubject);
    indexOfBookingSubject += 1;
    if (indexOfBookingSubject === this.allBooking.length - 1) {
      this.updatePageWithNextBookingSubject(indexOfBookingSubject);
      this.greyRightButton = true;
      this.greyLeftButton = false;


    } else {
      this.greyLeftButton = false;
        this.updatePageWithNextBookingSubject(indexOfBookingSubject);
    }
  }
  updatePageWithNextBookingSubject(indexOfBookingSubject: any) {
    this.bookingSubject = this.allBooking[indexOfBookingSubject];
    this.bookingSubjectChange.emit(this.bookingSubject);
  }
  loadPrevBookingSubject() {
    if (this.greyRightButton === true) {
      this.greyLeftButton = false;
    }
    let indexOfBookingSubject = this.allBooking.indexOf(this.bookingSubject);
    indexOfBookingSubject -= 1;
    if (indexOfBookingSubject === 0) {
      this.greyLeftButton = true;
      this.greyRightButton = false;
      this.bookingSubject = this.allBooking[indexOfBookingSubject];
      this.bookingSubjectChange.emit(this.bookingSubject);
    } else {
      this.greyRightButton = false;
      this.bookingSubject = this.allBooking[indexOfBookingSubject];
      this.bookingSubjectChange.emit(this.bookingSubject);
    }
  }
  isUserLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return !!user;
  }
  showDialog() {
    this.display = true;
  }
  getDefaultPhotoUrl() {
    return this.userService.defPhoto;
  }
}

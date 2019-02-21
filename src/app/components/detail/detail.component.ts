import { Comment } from './../../models/Comment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BookingSubject } from 'src/app/models/booking-subject';
import { BookingSubjectType } from 'src/app/models/booking-subject-type';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  @Input() bookingSubject: BookingSubject;
  @Output() bookingSubjectChange = new EventEmitter();
  @Input() allBooking: BookingSubject[];
  bookingComments: Comment[];
  nameOfRecommender: string;
  bookingType: string;
  greyRightButton = false;
  greyLeftButton = true;
  display = false;

  constructor() {
    this.bookingComments = [];
  }

  ngOnInit() {
    console.log('i ran', this.allBooking);
   // this.bookingSubject.comments = this.bookingSubject.comments[0];
    this.bookingComments.push(this.bookingSubject.comments[0]);
    this.bookingComments.push(this.bookingSubject.comments[1]);
    this.nameOfRecommender = this.bookingComments[0].fullName;
    this.bookingType = BookingSubjectType[this.bookingSubject.bookingType];
    /* const minValue = 0;
    const maxValue = this.bookingSubject.comments.length - 1;
    let comment: Comment;
    for (let i = 0; i < 1; i++) {
      comment = this.bookingSubject.comments[this.generateRandomNumber(minValue, maxValue)];
      this.bookingComments.push(comment);
    } */
    console.log('book Comments', this.bookingComments);
  }
  generateRandomNumber(minValue, maxValue) {
    return Math.floor(Math.random() * (maxValue - minValue) + minValue);
  }
  loadNextBookingSubject() {
    let idOfCurrentBookingSubject = this.bookingSubject.id;
    idOfCurrentBookingSubject += 1;
    if (idOfCurrentBookingSubject >= this.allBooking.length) {
      this.updatePageWithNextBookingSubject();
      this.greyRightButton = true;
      this.greyLeftButton = false;
    } else {
        this.updatePageWithNextBookingSubject();
    }
  }
  updatePageWithNextBookingSubject() {
    this.bookingSubject = this.allBooking[this.allBooking.length - 1];
    this.bookingSubjectChange.emit(this.bookingSubject);
  }
  loadPrevBookingSubject() {
    if (this.greyRightButton === true) {
      this.greyLeftButton = false;
    }
    let idOfCurrentBookingSubject = this.bookingSubject.id;
    idOfCurrentBookingSubject -= 1;
    if (idOfCurrentBookingSubject <= 1) {
      idOfCurrentBookingSubject = 0;
      this.greyLeftButton = true;
      this.greyRightButton = false;
      this.bookingSubject = this.allBooking[idOfCurrentBookingSubject];
      this.bookingSubjectChange.emit(this.bookingSubject);
    } else {
      this.bookingSubject = this.allBooking[idOfCurrentBookingSubject];
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
}

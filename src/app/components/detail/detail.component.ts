import { Comment } from './../../models/Comment';
import { Component, OnInit, Input } from '@angular/core';
import { BookingSubject } from 'src/app/models/booking-subject';
import { BookingSubjectType } from 'src/app/models/booking-subject-type';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  @Input() bookingSubject: BookingSubject;
  bookingComments: Comment[];
  nameOfRecommender: string;
  bookingType: string;

  constructor() {
    this.bookingComments = [];
  }

  ngOnInit() {
    console.log('i ran');
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

}

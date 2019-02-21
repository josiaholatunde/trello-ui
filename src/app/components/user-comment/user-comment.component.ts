import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingSubjectType } from 'src/app/models/booking-subject-type';
import { BookingSubjectService } from 'src/app/services/booking-subject.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-user-comment',
  templateUrl: './user-comment.component.html',
  styleUrls: ['./user-comment.component.scss']
})
export class UserCommentComponent implements OnInit {

  @Input() passDisplay;
  commentDto: any = {};
  paramName: any;
  bookingType: BookingSubjectType;
  constructor(private route: ActivatedRoute, private bookingService: BookingSubjectService, private alertify: AlertifyService) {
    route.params.subscribe(params => {
      if (params['name']) {
        this.paramName = params['name'];
      }
    });
  }

  ngOnInit() {
  }
  getBookingId(): BookingSubjectType {
    if (this.paramName === 'Hotel') {
      this.bookingType = BookingSubjectType.Hotel;
    } else  if (this.paramName === 'CarRental') {
      this.bookingType = BookingSubjectType.CarRental;
    } else  if (this.paramName === 'Tour') {
      this.bookingType = BookingSubjectType.Tour;
    }  else  if (this.paramName === 'Flight') {
      this.bookingType = BookingSubjectType.Flight;
    } else {
      this.bookingType = BookingSubjectType.Hotel;
    }
    return this.bookingType;
  }


  createComment() {
    const bookingId = this.getBookingId();
    this.bookingService.createComment(this.commentDto, bookingId).subscribe(res => {
      this.alertify.success('Successfully created comment for the booking');
    }, err => {
      this.alertify.error(err);
    }, () => {
      this.passDisplay = false;
    });

  }

}

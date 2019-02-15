import { Component, OnInit } from '@angular/core';
import { BookingSubjectType } from 'src/app/models/booking-subject-type';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchParams: any = {};
  currentBookingType: BookingSubjectType;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }
  onSubmit() {

  }

}

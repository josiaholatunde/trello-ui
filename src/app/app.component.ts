import { Component, OnInit } from '@angular/core';
import { BookingSubjectService } from './services/booking-subject.service';
import { BookingSubjectType } from './models/booking-subject-type';
import { BookingSubject } from './models/booking-subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
  }
}

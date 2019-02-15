import { BookingSubject } from 'src/app/models/booking-subject';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cta',
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.scss']
})
export class CtaComponent implements OnInit {

  @Input() bookingSubject: BookingSubject;
  constructor() { }

  ngOnInit() {
  }

}

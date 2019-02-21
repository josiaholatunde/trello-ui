import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BookingSubjectType } from '../models/booking-subject-type';
import { Observable, BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class BookingSubjectService {

  private baseUrl = `${environment.apiUrl}/bookings`;
  defaultBookingType = new BehaviorSubject(BookingSubjectType.Hotel);
  defaultBookingTypeObservable = this.defaultBookingType.asObservable();
  testProp = new BehaviorSubject('Ade');
  testPropObservable = this.testProp.asObservable();
  bookingType: any;
  constructor(private http: HttpClient) { }

  changeBookingType(bookingType: BookingSubjectType) {
    this.bookingType = BookingSubjectType[bookingType];
   this.defaultBookingType.next(bookingType);
  }

  changeAnotherProperty(status: string) {
    this.testProp.next(status);
  }

  getBookingSubjects(bookingType: BookingSubjectType, searchParams?: any): Observable<any[]> {
    let params = new HttpParams();
    if (searchParams) {
      params = params.append('nameOrLocation', searchParams);
    }
    if (bookingType != null) {
      params = params.append('bookingType', bookingType.toString());
    }
   return this.http.get<any[]>(this.baseUrl, { observe: 'body', params}).pipe();
  }
  createBooking(bookingDto: any) {
    return this.http.post<any[]>(this.baseUrl, bookingDto, httpOptions).pipe();
  }
  createComment(commentDto: any, bookingId: BookingSubjectType) {
    return this.http.post<any[]>(`${this.baseUrl}/${bookingId}/comments`, commentDto, httpOptions).pipe();
  }
}

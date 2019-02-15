import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BookingSubjectType } from '../models/booking-subject-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingSubjectService {

  baseUrl = `${environment.apiUrl}/bookings`;
  constructor(private http: HttpClient) { }

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
}

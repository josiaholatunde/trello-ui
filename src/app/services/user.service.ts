import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.apiUrl}/auth`;
  constructor(private http: HttpClient) { }

  registerUser(userFoRegisterationDto: any): Observable<any[]> {
   return this.http.post<any[]>(`${this.baseUrl}/register`, userFoRegisterationDto, httpOptions).pipe();
  }
  loginUser(userForLoginDto: any): Observable<any[]> {
   return this.http.post<any[]>(`${this.baseUrl}/login`, userForLoginDto, httpOptions).pipe(
     map((res: any) => {
        const token = JSON.stringify(res.token);
        const user = JSON.stringify(res.user);
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
        return res.user;
     })
   );
  }
}

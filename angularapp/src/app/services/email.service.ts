import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app-constants';
 
@Injectable({
  providedIn: 'root'
})
export class EmailService {
 
  private baseUrl = BASE_URL;
 
  constructor(private http: HttpClient) { }
 
  sendEmail(emailRequest: any): Observable<any> {
    return this.http.post(this.baseUrl + '/api/send-email', emailRequest);
  }
}
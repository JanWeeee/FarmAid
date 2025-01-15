import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';
import { FeedbackDTO } from '../models/feedbackDTO';
import { BASE_URL } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private apiUrl = `${BASE_URL}/api/feedback`;

  constructor(private http: HttpClient) { }

  sendFeedback(feedback: FeedbackDTO): Observable<any> {
    return this.http.post(this.apiUrl, feedback);
  }

  getAllFeedbacksByUserId(userId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/user/${userId}`);
  }

  deleteFeedback(feedbackId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${feedbackId}`);
  }

  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.apiUrl);
  }

  getFeedbacks1(): Observable<FeedbackDTO[]> {
     return this.http.get<FeedbackDTO[]>(this.apiUrl); 
  }
  
}






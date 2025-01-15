import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiKey = 'pub_60955251c6de6cc5b17a9573f30c809085729';
  private apiUrl = `https://newsdata.io/api/1/news?apikey=${this.apiKey}&q=Farming&country=in&language=en,hi`;

  constructor(private http: HttpClient) { }

  getLatestNews(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
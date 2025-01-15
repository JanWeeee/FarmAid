import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { BASE_URL } from '../app-constants';

export class AuthenticationBean {
  constructor(
    public userId: number,
    public token: string,
    public userRole: string,
    public username: string) { }
}

export const AUTHENTICATED_EMAIL = 'authenticatedEmail';
export const TOKEN = 'token';
export const USER_ID = 'userId';
export const USER_NAME = 'username';
export const USER_ROLE = 'userRole';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  apiUrl = BASE_URL;
  username: string = '';
  userRole: string = '';

  // Login
  login(email, password): Observable<any> {
    return this.http.post<AuthenticationBean>(this.apiUrl + '/api/login', { email, password }).pipe(
      map(
        data => {
          sessionStorage.setItem(USER_ID, "" + data.userId);
          sessionStorage.setItem(AUTHENTICATED_EMAIL, email);
          sessionStorage.setItem(USER_NAME, data.username);
          sessionStorage.setItem(USER_ROLE, data.userRole);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          this.username = data.username;
          this.userRole = data.userRole;
          return data;
        }
      )
    );
  }

  register(user: User): Observable<any> {
    return this.http.post(this.apiUrl + "/api/register", user);
  }

  getUserById(userId): Observable<any> {
    return this.http.get(this.apiUrl + '/api/user/' + userId);
  }

  getAuthenticatedUserId(): number {
    return parseInt(sessionStorage.getItem(USER_ID));
  }

  getAuthenticatedEmail() {
    return sessionStorage.getItem(AUTHENTICATED_EMAIL);
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedEmail())
      return sessionStorage.getItem(TOKEN);
  }

  existsByEmail(email: string): Observable<any> {
    return this.http.get(this.apiUrl + '/api/user/exists-by-email/' + email);
  }

  updatePassword(email: string, newPassword: string): Observable<any> {
    return this.http.put(this.apiUrl + '/api/user/updatePassword/' + email, newPassword);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_EMAIL);
    return !(user == null);
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_EMAIL);
    sessionStorage.removeItem(TOKEN);
    sessionStorage.removeItem(USER_ID);
  }

  // pageId(): string {
  //   var pageId = sessionStorage.getItem(PAGE_ID);
  //   if (pageId === null) {
  //     sessionStorage.setItem(PAGE_ID, 'login');
  //   }
  //   return pageId;
  // }

  // setPageId(pageId: string) {
  //   sessionStorage.setItem(PAGE_ID, pageId);
  // }

  getUserName(): string {
    return sessionStorage.getItem(USER_NAME);
  }
  getUserRole(): string {
    return sessionStorage.getItem(USER_ROLE);
  }
}
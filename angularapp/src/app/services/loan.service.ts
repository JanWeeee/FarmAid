import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from '../models/loan.model';
import { LoanApplication } from '../models/loanapplication.model';
import { BASE_URL } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  backendUrl: string = BASE_URL;

  constructor(private httpClient: HttpClient) {}

  getAllLoans(): Observable<any> {
    return this.httpClient.get(`${this.backendUrl}/api/loan`);
  }

  deleteLoan(loanId: number): Observable<any> {
    return this.httpClient.delete(`${this.backendUrl}/api/loan/${loanId}`);
  }

  getLoanById(id: number): Observable<any> {
    return this.httpClient.get(`${this.backendUrl}/api/loan/${id}`);
  }

  addLoan(requestObject: Loan): Observable<any> {
    return this.httpClient.post(`${this.backendUrl}/api/loan`, requestObject);
  }

  updateLoan(id: number, requestObject: Loan): Observable<any> {
    return this.httpClient.put(`${this.backendUrl}/api/loan/${id}`, requestObject);
  }

  getAppliedLoans(userId: number): Observable<any> {
    return this.httpClient.get(`${this.backendUrl}/api/loanapplication/user/${userId}`);
  }

  deleteLoanApplication(loanId: number): Observable<any> {
    return this.httpClient.delete(`${this.backendUrl}/api/loanapplication/${loanId}`);
  }

  addLoanApplication(formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.backendUrl}/api/loanapplication`, formData);
  }

  getAllLoanApplications(): Observable<any> {
    return this.httpClient.get(`${this.backendUrl}/api/loanapplication`);
  }

  updateLoanStatus(id: number, loanApplication: LoanApplication): Observable<any> {
    return this.httpClient.put(`${this.backendUrl}/api/loanapplication/${id}`, loanApplication);
  }

  // New methods to fetch loan status and monthly loan data
  getLoanStatus(): Observable<any> {
    return this.httpClient.get(`${this.backendUrl}/api/loan/status`);
  }

  getMonthlyLoanData(): Observable<any> {
    return this.httpClient.get(`${this.backendUrl}/api/loan/monthly`);
  }
}

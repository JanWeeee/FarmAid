
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanApplication } from 'src/app/models/loanapplication.model';
import { LoanService } from 'src/app/services/loan.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-requestedloan',
  templateUrl: './requestedloan.component.html',
  styleUrls: ['./requestedloan.component.css']
})
export class RequestedloanComponent implements OnInit {
  loans: LoanApplication[] = [];
  search: string = '';
  filteredLoans: LoanApplication[] = [];
  selectedLoan: LoanApplication | null = null;
  loanToReject: LoanApplication | null = null;
  columns: any[] = ['submissionDate', 'farmSizeInAcres', 'farmLocation', 'user.username', 'loan.loanType'];
  noDataFound: boolean = false;
  showRejectionModal: boolean = false;
  rejectionForm: FormGroup; // Use FormGroup for the rejection reason
  env = environment;

  constructor(private loanService: LoanService, private fb: FormBuilder) {
    this.rejectionForm = this.fb.group({
      rejectionReason: ['', [Validators.required, this.noWhitespaceValidator]]
    });
  }

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.loanService.getAllLoanApplications().subscribe(
      (data: LoanApplication[]) => {
        this.loans = data;
        this.loans = this.loans.reverse();
        this.filteredLoans = [...this.loans];
        this.noDataFound = this.loans.length === 0;
      },
      error => {
        console.error('Error fetching loan applications', error);
        this.noDataFound = true;
      }
    );
  }

  approveLoan(loan: LoanApplication) {
    loan.loanStatus = 1; // Approved
    this.loanService.updateLoanStatus(loan.loanApplicationId, loan).subscribe(() => {
      this.loadLoans();
    });
  }

  rejectLoan(loan: LoanApplication) {
    this.loanToReject = loan;
    this.showRejectionModal = true;
    this.rejectionForm.reset();
  }

  confirmRejectLoan(): void {
    if (this.rejectionForm.invalid) {
      this.rejectionForm.markAllAsTouched();
      return;
    }

    if (this.loanToReject) {
      this.loanToReject.loanStatus = 2; // Rejected
      this.loanToReject.rejectionReason = this.rejectionForm.value.rejectionReason.trim(); // Save the rejection reason
      this.loanService.updateLoanStatus(this.loanToReject.loanApplicationId, this.loanToReject).subscribe(() => {
        this.loadLoans();
        this.closeRejectionModal();
      });
    }
  }

  closeRejectionModal(): void {
    this.loanToReject = null;
    this.showRejectionModal = false;
  }

  showMore(loan: LoanApplication): void {
    this.selectedLoan = loan;
  }

  closeModal(): void {
    this.selectedLoan = null;
  }

  onSearch(event: any) {
    this.search = event.target.value.toLowerCase();

    if (!this.search || !this.loans) {
      this.filteredLoans = [...this.loans];
      return;
    }

    this.filteredLoans = this.loans.filter(item => {
      return this.columns.some(column => {
        const value = this.getNestedValue(item, column);
        return value ? value.toString().toLowerCase().includes(this.search) : false;
      });
    });
  }

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((o, p) => o && o[p], obj);
  }

  filterByStatus(status: any) {
    if (status === 'all') {
      this.filteredLoans = [...this.loans];
    } else if (status === 'approved') {
      this.filteredLoans = this.loans.filter(loan => loan.loanStatus === 1);
    } else if (status === 'rejected') {
      this.filteredLoans = this.loans.filter(loan => loan.loanStatus === 2);
    }
    this.noDataFound = this.filteredLoans.length === 0;
  }

  noWhitespaceValidator(control: any) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
}

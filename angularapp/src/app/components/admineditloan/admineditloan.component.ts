import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanService } from 'src/app/services/loan.service';
import { Loan } from 'src/app/models/loan.model';

@Component({
  selector: 'app-admineditloan',
  templateUrl: './admineditloan.component.html',
  styleUrls: ['./admineditloan.component.css']
})
export class AdmineditloanComponent implements OnInit {
  loanForm: FormGroup;
  loanId: number;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loanService: LoanService
  ) {
    this.loanForm = this.fb.group({
      loanType: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]+$')]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      interestRate: [0, [Validators.required, Validators.min(0), Validators.max(14)]],
      maximumAmount: [0, [Validators.required, Validators.min(0)]],
      repaymentTenure: [0, [Validators.required, Validators.min(0), Validators.max(360)]],
      eligibility: ['', Validators.required],
      documentsRequired: ['', Validators.required]
    });
    this.loanId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadLoanDetails();
  }

  loadLoanDetails(): void {
    this.loanService.getLoanById(this.loanId).subscribe(
      (loan: Loan) => {
        this.loanForm.patchValue({
          loanType: loan.loanType,
          description: loan.description,
          interestRate: loan.interestRate,
          maximumAmount: loan.maximumAmount,
          repaymentTenure: loan.repaymentTenure,
          eligibility: loan.eligibility,
          documentsRequired: loan.documentsRequired
        });
      },
      error => {
        console.error('Error fetching loan details:', error);
      }
    );
  }

  updateLoan(): void {
    if (this.loanForm.valid) {
      this.loanService.updateLoan(this.loanId, this.loanForm.value).subscribe(
        () => {
          this.successMessage = 'Loan updated successfully!';
        },
        error => {
          console.error('Error updating loan:', error);
        }
      );
    }
  }

  closeSuccessMessage(): void {
    this.successMessage = null;
    this.router.navigate(['/api/viewloan']);
  }

  goToViewLoan() {
    this.router.navigate(['/api/viewloan']);
  }
}

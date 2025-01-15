import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Loan } from 'src/app/models/loan.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-creatloan',
  templateUrl: './creatloan.component.html',
  styleUrls: ['./creatloan.component.css']
})
export class CreatloanComponent implements OnInit {

  loanForm: FormGroup;
  successMessage: boolean = false;

  constructor(private loanService: LoanService, private fb: FormBuilder, private router: Router) { 
    this.loanForm = this.fb.group({
      loanType: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]+$')]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      interestRate: [0, [Validators.required, Validators.min(0), Validators.max(14)]],
      maximumAmount: [0, [Validators.required, Validators.min(0), Validators.max(100000000)]],
      repaymentTenure: [0, [Validators.required, Validators.min(0), Validators.max(360)]],
      eligibility: ['', Validators.required],
      documentsRequired: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  addLoan(): void {
    if (this.loanForm.valid) {
      const loan: Loan = this.loanForm.value;
      this.loanService.addLoan(loan).subscribe(
        response => {
          console.log('Loan submitted successfully:', response);
          this.successMessage = true;
          // Add your success handling logic here
        },
        error => {
          console.error('Error submitting loan:', error);
          // Add your error handling logic here
        }
      );
    } else {
      this.loanForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }

  closeSuccessMessage(): void {
    this.successMessage = false;
    this.router.navigate(['/api/adminnav']);
  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Loan } from 'src/app/models/loan.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-userviewloan',
  templateUrl: './userviewloan.component.html',
  styleUrls: ['./userviewloan.component.css']
})
export class UserviewloanComponent implements OnInit {

  search: any;
  loans: Loan[] = [];
  filteredLoans: Loan[] = [];
  appliedLoans: Set<number> = new Set(); // Track applied loans using a Set
  loanTypes: string[] = []; // Array to hold unique loan types

  constructor(private service: LoanService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllLoans();

    // Check for successful application flag in query parameters
    this.route.queryParams.subscribe(params => {
      const loanId = params['loanId'];
      const success = params['success'];

      if (success && loanId) {
        this.appliedLoans.add(Number(loanId)); // Add loanId to applied loans set
      }
    });
  }

  getAllLoans() {
    this.service.getAllLoans().subscribe(data => {
      this.loans = data;
      this.loans = this.loans.reverse();
      this.filteredLoans = [...this.loans];
      this.extractLoanTypes(); // Extract unique loan types after fetching loans
    });
  }

  extractLoanTypes() {
    const loanTypeSet = new Set(this.loans.map(loan => loan.loanType));
    this.loanTypes = Array.from(loanTypeSet);
  }

  applyLoan(loanId: number) {
    this.router.navigate(['/api/loanform', { loanId }]);
  }

  isApplied(loanId: number): boolean {
    return this.appliedLoans.has(loanId); // Check if loanId is in the set
  }

  onSearch(event: any) {
    this.search = event.target.value.toLowerCase();

    if (!this.search || !this.loans) {
      this.filteredLoans = [...this.loans];
      return;
    }

    this.filteredLoans = this.loans.filter(item => {
      return Object.keys(item).some(column => {
        return item[column]?.toString().toLowerCase().includes(this.search);
      });
    });
  }

  onFilterChange(event: any) {
    const selectedType = event.target.value;

    if (selectedType === 'all') {
      this.filteredLoans = [...this.loans];
    } else {
      this.filteredLoans = this.loans.filter(loan => loan.loanType === selectedType);
    }
  }
}


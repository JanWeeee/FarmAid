import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Loan } from 'src/app/models/loan.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-viewloan',
  templateUrl: './viewloan.component.html',
  styleUrls: ['./viewloan.component.css']
})
export class ViewloanComponent implements OnInit {

  loans: Loan[] = [];
  search: any;
  showConfirmDialog = false;
  columns: string[] = ['loanType', 'description', 'interestRate', 'maximumAmount', 'repaymentTenure', 'eligibility', 'documentsRequired']
  loanIdToDelete: number | null = null;
  filteredLoans: Loan[];

  constructor(private loanService: LoanService, private router: Router) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.loanService.getAllLoans().subscribe(
      (data: Loan[]) => {
        this.loans = data;
        this.loans = this.loans.reverse();
        this.filteredLoans = [...this.loans]
        
      },
      error => {
        console.error('Error fetching loans:', error);
      }
    );
  }

  editLoan(loanId: number): void {
    this.router.navigate(['api/admineditloan', loanId]);
  }

  confirmDeleteLoan(loanId: number): void {
    this.loanIdToDelete = loanId;
    this.showConfirmDialog = true;
  }

  closeModal() {
    this.showConfirmDialog = false;
    this.loanIdToDelete = null;
    this.router.navigate(['/api/viewloan']);
  }

  deleteLoan(): void {
    if (this.loanIdToDelete !== null) {
      this.loanService.deleteLoan(this.loanIdToDelete).subscribe(
        () => {
          console.log('Loan deleted successfully');
          this.loadLoans(); // Refresh the list after deletion
          this.closeModal();
        },
        error => {
          console.error('Error deleting loan:', error);
        }
      );
    }
  }

  onSearch(event: any) {
    this.search = event.target.value.toLowerCase();
 
    if (!this.search || !this.loans) {
      this.filteredLoans = [...this.loans];
      return;
    }
 
    this.filteredLoans = this.loans.filter(item => {
      return this.columns.some(column => {
        return item[column]?.toString().toLowerCase().includes(this.search);
      });
    });
  }
}
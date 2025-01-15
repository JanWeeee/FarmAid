import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private loanService: LoanService) { 
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.createPieChart();
    this.createBarChart();
  }

  createPieChart() {
    this.loanService.getLoanStatus().subscribe(data => {
      new Chart("pieChart", {
        type: 'pie',
        data: {
          labels: ['Loan Approved', 'Loan Pending', 'Loan Rejected'],
          datasets: [{
            label: 'Loan Status',
            data: [data.approved, data.pending, data.rejected],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Loan Status Distribution'
            }
          }
        }
      });
    });
  }

  createBarChart() {
    this.loanService.getMonthlyLoanData().subscribe(data => {
      new Chart("barChart", {
        type: 'bar',
        data: {
          labels: data.months,
          datasets: [
            {
              label: 'Loan Applications',
              data: data.applications,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            },
            {
              label: 'Approved Loans',
              data: data.approved,
              backgroundColor: 'rgba(255, 206, 86, 0.2)',
              borderColor: 'rgba(255, 206, 86, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Monthly Loan Data'
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }
}
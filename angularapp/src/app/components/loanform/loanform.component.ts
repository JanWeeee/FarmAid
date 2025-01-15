import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoanApplication } from 'src/app/models/loanapplication.model';

@Component({
  selector: 'app-loanform',
  templateUrl: './loanform.component.html',
  styleUrls: ['./loanform.component.css']
})
export class LoanformComponent implements OnInit {

  myForm: FormGroup;
  fileUploaded: boolean = false;
  formSubmitted: boolean = false;
  showPopup: boolean = false;
  selectedFile: File | null = null;
  loanId: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private loanService: LoanService,
    private authService: AuthService
  ) {
    this.myForm = this.fb.group({
      farmLocation: ['', Validators.required],
      farmerAddress: ['', Validators.required],
      farmSizeInAcres: ['', [Validators.required, Validators.min(0.1)]],
      farmPurpose: ['', Validators.required],
      file: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loanId = +this.route.snapshot.paramMap.get('loanId')!;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.fileUploaded = true;
      this.myForm.patchValue({ file: this.selectedFile });
    }
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.myForm.invalid || !this.fileUploaded) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile!);
    formData.append('data', JSON.stringify({
      farmLocation: this.myForm.value.farmLocation,
      farmerAddress: this.myForm.value.farmerAddress,
      farmSizeInAcres: this.myForm.value.farmSizeInAcres,
      farmPurpose: this.myForm.value.farmPurpose,
      file: this.selectedFile!.name,  // Send the filename as a string
      userId: this.authService.getAuthenticatedUserId(),
      loanId: this.loanId,
      // submissionDate: new Date().toISOString(),
      loanStatus: 0
    }));

    console.log('FormData Content:');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    console.log('Submitting Loan Application:', this.myForm.value);  // Debugging log

    this.loanService.addLoanApplication(formData).subscribe(
      () => {
        this.router.navigate(['/api/userviewloan']);
        this.showPopup = true;
      },
      error => {
        console.error('Error submitting loan application', error);
      }
    );
  }

  goBack() {
    this.router.navigate(['/api/userviewloan']);
  }

  closePopup() {
    this.showPopup = false;
    this.router.navigate(['/api/userviewloan'], { queryParams: { loanId: this.loanId, success: true } });
  }
}


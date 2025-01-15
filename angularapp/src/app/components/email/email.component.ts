import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {

  OTP: string;
  senderMail: string = '';
  validMail: boolean = false;
  newPassword: string = '';
  confirmNewPassword: string = '';
  emailVerified: boolean = false;
  otpSent: boolean = false;
  otpInput: string = '';
  otpVerified: boolean = false;

  constructor(private emailService: EmailService, private authService: AuthService, private route: Router) { }

  emailRequest = {
    to: '',
    subject: '',
    body: ''
  };

  generateRandomSixDigitNumber(): string {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return randomNumber.toString();
  }

  validateEmail() {
    this.authService.existsByEmail(this.senderMail).subscribe(data => {
      if (data) {
        this.validMail = true;
      } else {
        alert('Invalid Email');
      }
    });
  }

  sendOtpEmail() {
    this.OTP = this.generateRandomSixDigitNumber();
    this.emailRequest = {
      to: this.senderMail,
      subject: 'Reset Password OTP',
      body: `Your OTP for password reset is ${this.OTP}`
    };

    this.emailService.sendEmail(this.emailRequest).subscribe(response => {
      this.otpSent = true;
      console.log('OTP email sent successfully', response.message); // Handle JSON response
    }, error => {
      console.error('Error sending OTP email:', error);
    });
  }


  verifyOtp() {
    if (this.OTP === this.otpInput) {
      this.otpVerified = true;
    } else {
      alert('Invalid OTP');
    }
  }

  resetPassword() {
    if (this.newPassword === this.confirmNewPassword) {
      this.authService.updatePassword(this.senderMail, this.newPassword).subscribe(response => {
        alert(response.message); // Handle JSON response
        this.route.navigate(['/api/login']);
      }, error => {
        console.error('Error resetting password:', error);
      });
    } else {
      alert('Passwords do not match');
    }
  }
}
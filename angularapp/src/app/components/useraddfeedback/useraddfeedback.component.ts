import { Component } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { FeedbackDTO } from 'src/app/models/feedbackDTO';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent {
  feedback: FeedbackDTO = {
    userId: this.authService.getAuthenticatedUserId(),
    text: ''
  };

  errorMessage: string;
  
  showPopup: boolean = false;

  constructor(private feedbackService: FeedbackService, private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.feedback.text) {
      this.errorMessage = 'Feedback is required';
      return;
    }
    
    this.feedbackService.sendFeedback(this.feedback).subscribe(
      response => {
        
        this.showPopup = true;
        this.errorMessage = '';
      },
      error => {
        this.errorMessage = 'Error adding feedback';
        
      }
    );
  }

  closePopup() { 
    this.showPopup = false;
    this.router.navigate(['/api/userviewfeedback']);
   }
}

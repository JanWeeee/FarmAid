import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackDTO } from 'src/app/models/feedbackDTO';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router,private feedbackService:FeedbackService) { }

  backgroundUrl = 'assets/main-bg.png';

  firstImage = 'assets/img1.png';

  secondImage = 'assets/img2.png';

  thirdImage = 'assets/img3.png';

  feedbacks: FeedbackDTO[] = [];


  currentBackgroundImage = this.backgroundUrl; logoFadedIn = false; logoShrunk = false; navVisible = false; paragraphVisible = false; image2Visible = false;
  ngOnInit() {
    this.animateLogo();
    this.setupAudio();
    this.loadFeedbacks();
  }
  animateLogo() { setTimeout(() => { this.logoFadedIn = true; setTimeout(() => { this.logoShrunk = true; setTimeout(() => { this.navVisible = true; this.currentBackgroundImage = this.firstImage; setTimeout(() => { this.currentBackgroundImage = this.secondImage; this.paragraphVisible = true; this.image2Visible = true; this.playAudio(); }, 2000); }, 1000); }, 3000); }, 1000); }

  playAudio() { const audio = new Audio('assets/no_surprises_doorbell.mp3'); audio.autoplay = true; audio.load(); }

  setupAudio() { const audioElement = document.getElementById('background-audio') as HTMLAudioElement; if (audioElement) { audioElement.autoplay = true; audioElement.load(); audioElement.addEventListener('canplaythrough', () => { audioElement.play(); }); } }

  onSignup() {
    this.router.navigate(['/api/register']);
  }
  onLogin() {
    this.router.navigate(['/api/login']);
  }

  loadFeedbacks(): void {
     this.feedbackService.getFeedbacks1().subscribe((data: FeedbackDTO[]) => 
     { this.feedbacks = data; }); 
    }

  



}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {
  showLogoutModal = false;
  username: string;
  userRole: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.username= this.authService.getUserName();
    this.userRole= this.authService.getUserRole();
  }

  confirmLogout(): void {
    this.showLogoutModal = true;
  }

  closeLogoutModal(): void {
    this.showLogoutModal = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/api/login']);
  }
}
 
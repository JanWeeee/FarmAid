import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {
 
  showLogoutModal = false;
  userId: number;
  user: any;
  isLoggedIn: boolean = false;
  username: string;
  userRole: string;
  constructor(private authService: AuthService, private router: Router) { }
 
  ngOnInit(): void {
    
    this.username = this.authService.getUserName();
    this.userRole = this.authService.getUserRole();
    console.log(this.username + "userRole:"+ this.userRole);
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
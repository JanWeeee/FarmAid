import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ErrorComponent } from './components/error/error.component';
import { RouteGuardService } from './services/router-gaurd.service';
import { CreatloanComponent } from './components/creatloan/creatloan.component';
import { AdmineditloanComponent } from './components/admineditloan/admineditloan.component';
import { ViewloanComponent } from './components/viewloan/viewloan.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RequestedloanComponent } from './components/requestedloan/requestedloan.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { LoanformComponent } from './components/loanform/loanform.component';
import { UserappliedloanComponent } from './components/userappliedloan/userappliedloan.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewloanComponent } from './components/userviewloan/userviewloan.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserhomeComponent } from './components/userhome/userhome.component';
import { GameComponent } from './components/game/game.component';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { EmailComponent } from './components/email/email.component';
 
const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'api/contact', component: ContactComponent },
  { path: 'api/about', component: AboutComponent },
  { path: 'api/register', component: SignupComponent },
  { path: 'api/login', component: LoginComponent },
  { path: 'api/navbar', component: NavbarComponent },
  { path: 'api/home', component: HomePageComponent, canActivate: [RouteGuardService] },
  { path: 'api/home', component: HomePageComponent, canActivate: [RouteGuardService] },
  { path: 'api/usernav/api/home', component: HomePageComponent, canActivate: [RouteGuardService] },
  { path: 'api/userhome', component: UserhomeComponent, canActivate: [RouteGuardService] },
  { path: 'api/adminnav', component: AdminnavComponent, canActivate: [RouteGuardService] },
  { path: 'api/adminhome', component: AdminhomeComponent, canActivate: [RouteGuardService] },
  { path: 'api/creatloan', component: CreatloanComponent, canActivate: [RouteGuardService] },
  { path: 'api/game', component: GameComponent, canActivate: [RouteGuardService] },
  { path: 'api/admineditloan/:id', component: AdmineditloanComponent, canActivate: [RouteGuardService] },
  { path: 'api/viewloan', component: ViewloanComponent, canActivate: [RouteGuardService] },
  { path: 'api/requestedloan', component: RequestedloanComponent, canActivate: [RouteGuardService] },
  { path: 'api/adminviewfeedback', component: AdminviewfeedbackComponent, canActivate: [RouteGuardService] },
  { path: 'api/userviewfeedback', component: UserviewfeedbackComponent, canActivate: [RouteGuardService] },
  { path: 'api/loanform', component: LoanformComponent, canActivate: [RouteGuardService] },
  { path: 'api/userviewloan', component: UserviewloanComponent, canActivate: [RouteGuardService] },
  { path: 'api/userappliedloan', component: UserappliedloanComponent, canActivate: [RouteGuardService] },
  { path: 'api/useraddfeedback', component: UseraddfeedbackComponent, canActivate: [RouteGuardService] },
  { path: 'api/userviewfeedback', component: UserviewfeedbackComponent, canActivate: [RouteGuardService] },
  { path: 'api/usernav', component: UsernavComponent, canActivate: [RouteGuardService] },
  { path: 'api/forgotpassword', component: EmailComponent },
  { path: 'api/dashboard', component: UserDashboardComponent, canActivate: [RouteGuardService] },
  { path: 'error', component: ErrorComponent, data: { message: 'Oops! Something went wrong.' } },
  { path: '**', redirectTo: '/error'}
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { LandingComponent } from './components/landing/landing.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path:'', redirectTo: 'landing', pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'sign-in',component:SigninComponent},
  {path:'sign-up',component:SignupComponent},
  {path:'landing',component:LandingComponent},
  {path:'profile',component:ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

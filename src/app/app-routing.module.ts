import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { LandingComponent } from './components/landing/landing.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DataGuard } from "./services/data.guard";
import { PListComponent } from './components/home/playlist/p-list/p-list.component';
import { MusicsComponent } from './components/home/musics/musics.component';
import { PlaylistdetailsComponent } from './components/home/playlist/p-list/playlistdetails/playlistdetails.component';

const routes: Routes = [
  {path:'', redirectTo: 'landing', pathMatch:'full'},
  {path:'home',component:HomeComponent,canActivate:[DataGuard],children:[
    {path:'featured-playlists',component:PListComponent,children:[
          {path:':id',component:PlaylistdetailsComponent}
    ]},
    {path:'songs',component:MusicsComponent}
  ]},
  {path:'sign-in',component:SigninComponent},
  {path:'sign-up',component:SignupComponent},
  {path:'landing',component:LandingComponent},
  {path:'profile',component:ProfileComponent,canActivate:[DataGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

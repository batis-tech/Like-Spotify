import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { LandingComponent } from './components/landing/landing.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HeaderComponent } from './components/landing/header/header.component';
import {MatMenuModule} from '@angular/material/menu';
import { BannerComponent } from './components/landing/banner/banner.component';
import { FeatureComponent } from './components/landing/feature/feature.component';
import { FooterComponent } from './components/landing/footer/footer.component';

import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    HeaderComponent,
    BannerComponent,
    FeatureComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    AngularFireModule.initializeApp(environment.firebase),  // imports firebase/app needed for everything
  AngularFirestoreModule,                                 // imports firebase/firestore, only needed for database features
  // AngularFireStorageModule,                               // imports firebase/storage only needed for storage features
  AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

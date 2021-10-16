import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { LandingComponent } from './components/landing/landing.component';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { HeaderComponent } from './components/landing/header/header.component';
import {MatMenuModule} from '@angular/material/menu';
import { BannerComponent } from './components/landing/banner/banner.component';
import { FeatureComponent } from './components/landing/feature/feature.component';
import { FooterComponent } from './components/landing/footer/footer.component';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { environment } from '../environments/environment';
import { SidebarComponent } from './components/home/sidebar/sidebar.component';
import { HomeHeaderComponent } from './components/home/header/header.component';
import { MusicsComponent } from './components/home/musics/musics.component';
import { HttpClientModule } from "@angular/common/http";
import { ArtistsComponent } from './components/home/artists/artists.component';

import { PlaylistComponent } from './components/home/playlist/playlist.component';
import { AllListComponent } from './components/home/playlist/all-list/all-list.component';
import { PListComponent } from './components/home/playlist/p-list/p-list.component';
import { PlaylistdetailsComponent } from './components/home/playlist/p-list/playlistdetails/playlistdetails.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ArtistprofileComponent } from './components/home/artistprofile/artistprofile.component';
import { TracksComponent } from './components/home/tracks/tracks.component';
import { PlaytracksComponent } from './components/home/playtracks/playtracks.component';

import { VimeModule } from '@vime/angular';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    LandingComponent,
    HeaderComponent,
    BannerComponent,
    FeatureComponent,
    FooterComponent,
    SidebarComponent,
    HomeHeaderComponent,
    MusicsComponent,
    ArtistsComponent,
    PlaylistComponent,
    AllListComponent,
    PListComponent,
    PlaylistdetailsComponent,
    ArtistprofileComponent,
    TracksComponent,
    PlaytracksComponent,




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
    HttpClientModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatCardModule,
    VimeModule,
    NgxAudioPlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

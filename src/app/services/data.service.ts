import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import {  Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private httpOption ={
    headers : new HttpHeaders({
    'Accept' : 'application/json',
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer add OAuth Token here '
    })
  }

  private httpArtist ={
    headers : new HttpHeaders({
    'Accept' : 'application/json',
    'Content-Type' : 'application/json',
    'Authorization': 'add OAuth Token here '
    })
  }
  private httpArtistAlbum ={
    headers : new HttpHeaders({
    'Accept' : 'application/json',
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer add OAuth Token here '
    })
  }
  private httpArtistAlbumTracks ={
    headers : new HttpHeaders({
    'Accept' : 'application/json',
    'Content-Type' : 'application/json',
    'Authorization': 'add OAuth Token here '
    })
  }
  private httpArtistAlbumDetails ={
    headers : new HttpHeaders({
    'Accept' : 'application/json',
    'Content-Type' : 'application/json',
    'Authorization': 'add OAuth Token here '
    })
  }
  private httpPlayTracks ={
    headers : new HttpHeaders({
    'Accept' : 'application/json',
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer add OAuth Token here '
    })
  }

  SignIn: boolean;
  constructor(private afAuth :AngularFireAuth,private afs :AngularFirestore, private router :Router, private http :HttpClient) {
   this.SignIn = false;
   this.afAuth.onAuthStateChanged((user)=>{
     if(user){
       this.SignIn = true;
     }else{
       this.SignIn = false
     }
   });
  }


  signUp(user:any):Promise<any>{
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
    .then((result) => {
      let emailLower = user.email.toLowerCase();
      this.afs.doc('/users/'+ emailLower).set({
                accountType:'endUser',
                firstName: user.firstName,
                firstName_lower: user.firstName.toLowerCase(),
                lastName: user.lastName,
                lastName_lower: user.lastName.toLowerCase(),
                email: user.email,
                email_lower: emailLower
      });
      if (result.user) {
        result.user.sendEmailVerification();
      }
    })
    .catch(error => {
        console.log('Auth Service: signup error', error);
        if (!error.code){
        return {isValid: false, message: error.message}
      }else{
         return null
      }
      })
  }

  loginUser(email: string, password: string):Promise<any>{
      return this.afAuth.signInWithEmailAndPassword(email, password).then(() => {
        console.log('Auth Service: loginUser: sucess');
        this.router.navigate(['/home']);
      })
      // .catch(error => {
      //   console.log('Auth Service: login error...');
      //   console.log('erorr code', error.code);
      //   console.log('error', error);
      //   if (error.code)
      //      return {isValid: false, message: error.message}
      // });
    }
    logoutUser(): Promise<void> {
    return this.afAuth.signOut()
        .then(() => {
            this.router.navigate(['landing']);                    // when we log the user out, navigate them to home
        })
        // .catch(error => {
        //     console.log('Auth Service: logout error...');
        //     console.log('error code', error.code);
        //     console.log('error', error);
        //     if (error.code)
        //         return error;
        // });
}

  integrate: HttpHeaders = new HttpHeaders({
  'Authorization': 'add OAuth Token here '
  })
  getNewRelease(){
  return this.http.get<any>('https://api.spotify.com/v1/browse/new-releases', {headers: this.integrate})
  }




  integratePlayList: HttpHeaders = new HttpHeaders({
  'Authorization': 'add OAuth Token here '
  })
  getPlaylist(){
  return this.http.get<any>('https://api.spotify.com/v1/browse/featured-playlists', {headers: this.integratePlayList})
  }

  integratePlayListDetails: HttpHeaders = new HttpHeaders({
  'Authorization': 'add OAuth Token here '
  })
  getPlaylistDetails(id: string){
  return this.http.get<any>(`https://api.spotify.com/v1/browse/featured-playlists/${id}`, {headers: this.integratePlayListDetails})
  }


  getAllArtists(searchQuery: any):Observable<any>{
    let artistUrl = `https://api.spotify.com/v1/search?q=${searchQuery}&type=artist`;
    return this.http.get<any>(artistUrl, this.httpOption)
  }

  getArtistDetail(artistsId: any):Observable<any>{
    let artistDetailUrl = `https://api.spotify.com/v1/artists/${artistsId}`;
    return this.http.get<any>(artistDetailUrl, this.httpArtist)
  }
  getArtistAlbum(artistsId:any):Observable<any>{
    let artistAlbum =`https://api.spotify.com/v1/artists/${artistsId}/albums`;
     return this.http.get<any>(artistAlbum, this.httpArtistAlbum)
  }
  getArtistAlbumDetails(albumId:any):Observable<any>{
    let artistAlbumDetails =`https://api.spotify.com/v1/albums/${albumId}`;
     return this.http.get<any>(artistAlbumDetails, this.httpArtistAlbumDetails)
  }
  getArtistAlbumTracks(albumId:any):Observable<any>{
    let artistAlbumTracks =`https://api.spotify.com/v1/albums/${albumId}/tracks`;
     return this.http.get<any>(artistAlbumTracks, this.httpArtistAlbumTracks)
  }
  playtrack(trackId:any):Observable<any>{
    let playTracks =`	https://api.spotify.com/v1/tracks/${trackId}`;
     return this.http.get<any>(playTracks, this.httpPlayTracks)
  }

}

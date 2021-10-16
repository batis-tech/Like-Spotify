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
    'Authorization': 'Bearer BQCFauSMPQRM8PJK31Og4pNN5cUE-cIb4jJpBzJ3poUhYEmo1wLgXy3vjoA0kZFs8RHPR10lclEJJ8UVmMIYQCKXrXU2bQ7kL_396mCDewf7tmkpIPTqf4BQe9to7cI3jyyu_hISkTULVBTm-EDHquHtLSmvyrk'
    })
  }

  private httpArtist ={
    headers : new HttpHeaders({
    'Accept' : 'application/json',
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer BQCXrwedd95MfR-fJWhnXVrxlYCK9x_o5zG-1ByayS_bj7JORNKM9BfE58MJMXFp6j-xDJG1EoDOBg93YIdM8dljOgPWRJINGhgbVWRF2fBnfSzVItqkOwb2hcLNgIMZPMqM2JEdScwYDuMGRgt8HZzSK2ikCGY'
    })
  }
  private httpArtistAlbum ={
    headers : new HttpHeaders({
    'Accept' : 'application/json',
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer BQBT9irLtYDOZW9uJs5b405Jc31zBwObNtRJ1ROEqzhBAQ68NxmybM6xF7oQYWQrOeNOGYorTeWzYe95bBcrWxupWudG-PhzYxveLOixOtin3fvMHFOWjXICap8qXSevrPYzXMfs-ZrRLP-tSjIMZMmh8yddlEw'
    })
  }
  private httpArtistAlbumTracks ={
    headers : new HttpHeaders({
    'Accept' : 'application/json',
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer BQDR7IYiKGnw0Q6i7cULep37EnpWqITWSVCgxzOMl3JJkG1ZLHyu1_HVKtONvp6p1wy8DJmf3ibvuhZlaKJzVoWag5E3h6OYV_AUfBhr2N3NBnvYWEjlSYUdMy3GFwuO7hiIXIECxfuj3tL0WbpLuJzmIbyMEk8'
    })
  }
  private httpArtistAlbumDetails ={
    headers : new HttpHeaders({
    'Accept' : 'application/json',
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer BQASqK-cTPfnhTGbSUE1OsJMQkBIOwuFOJBgBHbH5l8VowOmnWMwaMYap6E22b6pM799Yi7jVXNXsHw0VXmi_c3c9BXWFIB5TuguttoyfxcsvjnJZvG3CCjHNQPMh6DdIZ_RFo88ZuXE0rPdyE1T5aHAGilOAQ8'
    })
  }
  private httpPlayTracks ={
    headers : new HttpHeaders({
    'Accept' : 'application/json',
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer BQDR12jC4Em8LnS2-kO4MJSeQbgIj1gYf2D35ts3Me5l6oOj_ih7wiMYM-zKqoKAIjlrr8NSr4EhOJIyZ8g_tNDWSBp3TH5_jPfq54NTQ9Tm7lhk5uObmsKHOci9VHtHFv4ruBLbeyEB20CEPEAB0eCwyHIl64w'
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



  integrate: HttpHeaders = new HttpHeaders({
  'Authorization': 'Bearer BQBEZ9d9u30n9xb9--S0PziIjoBTmM_oq813ZdjUOQAwqL2oH0OIF4DRbEGMh9wjuVWRRneRsZQTk6QhmI-7HLVRWjsu73qDosSmg7ZYNf5ZTjD4UEfFR8CpWGl40qZpIBPfjJT24JK8RwMW3GxoXV416TNG7d4'
  })
  getNewRelease(){
  return this.http.get<any>('https://api.spotify.com/v1/browse/new-releases', {headers: this.integrate})
  }




  integratePlayList: HttpHeaders = new HttpHeaders({
  'Authorization': 'Bearer BQD6mrVql6ARk1YV-K5KnE3A8zKdlUwHeFmx8OVrUiTh2HGy2Xy-Vpl1Kn5MqjPdOCr7Px3XDA7D6gpsP9_dVvwuZQSdrVWRBT-bSLZCWr2vxbVdUducFtWZYRAftVgrLNw0GDrDk2J8GTudNdZVxW5F1qzSD1Q'
  })
  getPlaylist(){
  return this.http.get<any>('https://api.spotify.com/v1/browse/featured-playlists', {headers: this.integratePlayList})
  }

  integratePlayListDetails: HttpHeaders = new HttpHeaders({
  'Authorization': 'Bearer BQAL-MGVm0Dc3TTnUex_BvW0SvVPfuQ1o0jV-_2sy-zZaBZYXREQ9VPGZjvebnt01FYAJZVE-_ikgRMjM_dY3yT6jsxZI7C_B1P3ohXZziug-IStF6fkNJuR8oW9vhqPkFd2hxoC9wtFhlEpHq7Faobb3CvHYwM'
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

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
    'Authorization': 'Bearer BQC5twkON5tTxDX-KZAKI8k-MqO3zNm-WizTb5Fh_1hMpWpvkBeZwdwDJkzRlIhbA8m24zONzLjk1j70mZAM5ADyoj1-bZl1rpcZ2x-KOURfdcJTxoginjzBqHPObZ0Ac8soOobVKoWpv6u6dMy5YmqRIiP6d8c'
    })
  }

  private httpArtist ={
    headers : new HttpHeaders({
    'Accept' : 'application/json',
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer BQDZ5CmRi-3JuLzfRYHFMa7R6jSNCthCTXBpGrVLtdeElLN7KDV3ramttf-P1zWWQzNqHRV3GN8SVC-Nw_ulsNn5n7UzgzckZX_LPLEpOJS3bNHbeOYZuElCcClkAqFEYaPGYxaiRMt5SAAHPjPZCRbIzC80Mes'
    })
  }
  private httpArtistAlbum ={
    headers : new HttpHeaders({
    'Accept' : 'application/json',
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer BQBlwAXaLxUJvZhX-yU9Ay7YZMTcrBA85P-Y-0JZfqbP7RAYbpgoOiI_RzWp2mtWbu0eP8qTEt1w_XXLwiUaULjbF4NT-iZlOGh3Y1cY6SeA5ooB9AhR2oZJffsJKwi155A_m3cyvW_iQkmD1PsS8c4kmxW1wEM'
    })
  }
  private httpArtistAlbumTracks ={
    headers : new HttpHeaders({
    'Accept' : 'application/json',
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer BQDCf_rPWsnd_Y_YDdVefFL10QEcOmHKlHhD2u2c6XkzJzD1j8Htkyo-LzrDB05K1-0NWl27kXzE0L47DwvtgyBtgue_v0rXyIkXoRg99OkBC9yn51V1W3mhNXIFgvIUgyxim5RNlbRqKJWdQLzgXB9FipyEg5E'
    })
  }
  private httpArtistAlbumDetails ={
    headers : new HttpHeaders({
    'Accept' : 'application/json',
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer BQB_jxVoLQJHgwaXbWo8HCdTb7IUR4nbfTHJ0Mvn3x4fFlJdSitDRrQFQiQU-J7k-yR-ITAHUl7s-pO9OhZCFaCL70Kz3woCYtyFYJuZZwpIvykv4gOpwYo38ajz1n75tAhBfH3sNzSqJGYcbtwqM8PjFiXeDPM'
    })
  }
  private httpPlayTracks ={
    headers : new HttpHeaders({
    'Accept' : 'application/json',
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer BQC-x64nOSnG1b09prhRu5JwmBmdHX3pWoFvKgDcbUfwJshxIj2a_LkWY_GR3sFciIDx91A8lW4mfRAxSbUS-HAu7WoH5_nLjzrLYicbPDkSm3z9HUBSNgULJsS4aOx3mE0b3hMuxyhgctHlTvc77x__JElRYzA'
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

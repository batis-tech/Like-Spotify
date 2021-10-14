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
    'Authorization': 'Bearer BQBfTRBCVUmIMtV5TXyrICM_tchXKLHFxVU4CVfN5eFPfP5g1HASgiNFfEDbmdLVKSfwTgUjt487ofm30nXFR24ENGmdgKgWA7ULuYs_CBSULW26Wai1lnCUl2xekWAyuDYi4agq86YT4sRSpbgu8-o0ZecdYAc'
    })
  }

  private httpArtist ={
    headers : new HttpHeaders({
    'Accept' : 'application/json',
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer BQDWKTEAj0M_L_FstujSGjqLPp5Py96_Aj5tPmQXQ-zlFPgzd6kpsyhinJx2EFmSiW69VztmJUN8S-jTOVb7MlNJEAYYq8h0DiqTgIU-ZOLD9XVEb8LYdc2nRWjeMuWDn8B4PHBBk0G3X9Kg8rFl2aX2FvtHSbw'
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

}

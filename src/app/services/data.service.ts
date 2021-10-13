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


  integrateArtists: HttpHeaders = new HttpHeaders({
  'Authorization': 'Bearer BQAbGGLYZvIEC4TsBY98l4nGjVXIRj1ETkqbHrMpR7bFM8uQkMrcymAFdf_G45HZe_cqQ_WxslAYUPZ9e5_VaeuiEBB2V_LjXn-kdBLZgoWkS7yApPRSeZdwusr2pyCL8X0fP7Cd89m5_jwPl_HoLoyFCEicZQM'
  })
  getArtists(){
  return this.http.get<any>('https://api.spotify.com/v1/artists', {headers: this.integrateArtists})
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

  // search: HttpHeaders = new HttpHeaders({
  // 'Authorization': 'Bearer BQD6mrVql6ARk1YV-K5KnE3A8zKdlUwHeFmx8OVrUiTh2HGy2Xy-Vpl1Kn5MqjPdOCr7Px3XDA7D6gpsP9_dVvwuZQSdrVWRBT-bSLZCWr2vxbVdUducFtWZYRAftVgrLNw0GDrDk2J8GTudNdZVxW5F1qzSD1Q'
  // })
  // getSearch(id: string){
  // return this.http.get<any>('https://api.spotify.com/v1/search', {headers: this.search})
  // }

}

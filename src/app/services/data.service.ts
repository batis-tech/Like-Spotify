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
  'Authorization': 'Bearer BQCPMy90uH4UajokLRsdUNZwWYxGBPBH_lDrzn42NgmdeTTo23QN8tGjAPAqqm3G0sOQq7ntekjXqX0F5dmsXfp0yc6Jt4hwwIRvv4_QNRL0NwCg2LMH8kFceE1zryDI-mXV2V8_hx3XGpLy-XpET8oZAISzkKY'
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
  'Authorization': 'Bearer BQAbJJvmZKwGcyAsg6kkT_-UBFITHZA2rpOUdJoI3f93zD6MT5AphontAjYfYe57CrTcf-QMP37zF-ACd36I2DREo5UOridrX7V-IkXklG5CCngS0EfuUVqst103W1vG30zpq0UdteUd77vdw4J__d_cOr6yjqo'
  })
  getPlaylist(){
  return this.http.get<any>('https://api.spotify.com/v1/browse/featured-playlists?limit=50', {headers: this.integratePlayList})
  }

  integratePlayListDetails: HttpHeaders = new HttpHeaders({
  'Authorization': 'Bearer BQA-q4eaKT998gBzXHjod7Ay3bh1tCDb7KT3jnxinD5sbIE_Y8NW3xgv-c61xKGgHFKQOOeXMQ83nAhFQ5C54XvZdpqW0mCRXIq7YSwIPvBC_h2G9tvNZd9rDac3eQdzFODDSgEXGsvO7ZOf9Ji0HKQEnOlFehI'
  })
  getPlaylistDetails(id: string){
  return this.http.get<any>(`https://api.spotify.com/v1/browse/featured-playlists/${id}`, {headers: this.integratePlayListDetails})
  }


}

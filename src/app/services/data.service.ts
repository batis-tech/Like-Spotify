import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { HttpClient,HttpHeaders } from "@angular/common/http";

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
      'Authorization': 'Bearer BQBppnYrmp2SJDF2Bt6SQXRU2XyP6dtwwVyThyRhv1R0a1uHljWxooSeyqVCFO9ecTyxzU8h7TzJLpj-T0Di3U4plIdGCbatihIQ7R2LQ7hIJRI14TDtFHPlui58ebdKE5NMkr3_dSsX8llwiZJDlrjezzXBgvA'
      })

    getNewRelease(){
    return this.http.get<any>('https://api.spotify.com/v1/browse/new-releases', {headers: this.integrate})
    }


}

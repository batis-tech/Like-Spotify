import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,Router, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class DataGuard implements CanActivate {

  constructor(private router :Router, private afAuth :AngularFireAuth){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise ((resolve ,reject)=> {
      this.afAuth.onAuthStateChanged((user)=>{
        if (user){
          // if (!user.emailVerified) {    // to verify an email
          //   this.router.navigate(['/verify-email'])
          // }
          resolve(true);

        }else{
          console.log('auth Guard: usser not logges in');
          this.router.navigate(['/home']);
          console.log();
          resolve(false);
        }
      })
    })
  }

}

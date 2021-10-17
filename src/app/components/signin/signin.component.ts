import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { UsersData } from "../../services/users.model";
import { DataService } from "../../services/data.service";
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/compat/auth";
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {


  constructor(private afAuth:AngularFireAuth, private dataService :DataService, private router:Router) { }
  form: NgForm[] = [];

  ngOnInit(): void {
    if (this.dataService.SignIn) {                       // if the user's logged in, navigate them to the dashboard (NOTE: don't use afAuth.currentUser -- it's never null)
      this.router.navigate(['/dashboard']);
    }
  }
  loginUser(form: NgForm) {
    // show the progress indicator as we start the Firebase login process
        const value = form.value;
        console.log(value);
    this.dataService.loginUser(value.email,value.password).then((result) => {
                     // no matter what, when the auth service returns, we hide the progress indicator
      if (result == null) {                               // null is success, false means there was an error
        console.log('logging in...');
        this.router.navigate(['/dashboard']);                // when the user is logged in, navigate them to dashboard
      }
      else if (result.isValid == false) {
        console.log('login error', result);

      }
    });
  }

}

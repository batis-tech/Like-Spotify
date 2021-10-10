import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { UsersData } from "../../services/users.model";
import { DataService } from "../../services/data.service";
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/compat/auth";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: NgForm[] = [];
  firebaseErrorMessage: string;
  newUser: any;

  constructor(private afAuth:AngularFireAuth, private dataService :DataService, private router:Router) {
    this.firebaseErrorMessage='';

  }

  ngOnInit(): void {
    if (this.dataService.SignIn) {                       // if the user's logged in, navigate them to the dashboard (NOTE: don't use afAuth.currentUser -- it's never null)
          this.router.navigate(['/dashboard']);
      }else{
        this.router.navigate(['/landing']);
      }
  }
  onSubmit(form: NgForm){
    const value = form.value;
    const newUser = new UsersData(value.firstName, value.lastName, value.email, value.password);
    this.dataService.signUp(newUser).then((result)=>{
      if(result == null){
        this.router.navigate(['/home']);
      }else if( result.isValid == false){
        this.firebaseErrorMessage = result.message;
      }
    }).catch(()=>{
      console.log('somthing went wrong');
    })
  }

}

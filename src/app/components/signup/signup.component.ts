import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { UsersData } from "../../services/users.model";
import { DataService } from "../../services/data.service";
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: NgForm[] = [];
  firebaseErrorMessage: string;
  newUser: any;

  constructor(private afAuth:AngularFireAuth, private dataService :DataService, private router:Router,
              public dialogRef: MatDialogRef<SignupComponent>) {
    this.firebaseErrorMessage='';

  }

  ngOnInit(): void {
    if (this.dataService.SignIn) {                       // if the user's logged in, navigate them to the dashboard (NOTE: don't use afAuth.currentUser -- it's never null)
          this.router.navigate(['home']);

      }else{
        this.router.navigate(['landing']);
      }
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newUser = new UsersData(value.firstName, value.lastName, value.email, value.password);
    this.dataService.signUp(newUser).then((result)=>{
      if(result == null){
        this.router.navigate(['home']);
         this.dialogRef.close();
      }else if( result.isValid == false){
        this.firebaseErrorMessage = result.message;
         this.dialogRef.close();
      }
    }).catch(()=>{
      console.log('somthing went wrong');
    })
  }



}

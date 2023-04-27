import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm:FormGroup;
  isSubmitted = false;
  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router) { }

  ngOnInit() {
    this.isSubmitted = false;
    this.registerForm = this.fb.group(
      {
      email: new FormControl(null,[Validators.email,Validators.required]),
      password: new FormControl('',[Validators.required,Validators.minLength(8)]),
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),}
      )
  }


  register(){
  console.log("Poziva se ovo");
  this.isSubmitted = true;
   console.log(this.registerForm.get("email").value);
    if(this.registerForm.valid){
      this.authService.register(this.registerForm.value).subscribe(
        (res)=>{
          this.authService.setSessionData(res);
          if(this.authService.getUserStatus()=="admin"){
            this.router.navigate(['/home']);
          }else if(this.authService.getUserStatus()=="user"){
            this.router.navigate(['/home']);
          }else{ 
          }
        });
    }else{
      console.log("NIje validno");
      // this.isSubmitted = false;
    }
    
  
  }
}

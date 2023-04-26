import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm:NgForm;
  constructor(private router:Router,private authService:AuthService) {
   }

  ngOnInit() {
  }

  logIn(loginForm:NgForm){
    console.log(loginForm);
     this.loginForm = loginForm;
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe(
        (res)=>{
          this.authService.setSessionData(res);
          if(this.authService.getUserStatus()=="admin"){
            this.router.navigate(['/home']);
          }else if(this.authService.getUserStatus()=="user"){
            this.router.navigate(['/home']);
          }else{ 
          }
        });
    }
   

    console.log(this.loginForm.value);
  }
  
  
  
}

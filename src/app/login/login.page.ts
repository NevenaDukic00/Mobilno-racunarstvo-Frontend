import { Component, HostListener, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonRouterOutlet } from '@ionic/angular';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  
  loginForm:NgForm;
  login = false;
  constructor(private ionRouter:IonRouterOutlet,public alertController: AlertController,private router:Router,private authService:AuthService) {
    
   }

  ngOnInit() {
    this.ionRouter.swipeGesture=false;
  }

  async logIn(loginForm:NgForm){
    console.log(loginForm);
     this.loginForm = loginForm;
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe(
        (res)=>{
          this.authService.setSessionData(res);
          if(this.authService.getUserStatus()=="admin"){
            this.login = true;
            this.alertController.create({
              header: 'Welcome',
              message: 'Welcome back admin!',
              buttons: ['OK']
            }).then(res => {
              res.present();
              this.router.navigate(['/home']);
            });
            
          }else if(this.authService.getUserStatus()=="user"){
            this.login = true;
            this.alertController.create({
              header: 'Welcome',
              message: 'Welcome back ' + this.authService.getUserName(),
              buttons: ['OK']
            }).then(res => {
              res.present();
              this.router.navigate(['/home']);
            });
          }else{ 
            this.alertController.create({
              header: 'Error',
              message: 'Email or password is wrong!',
              buttons: ['OK']
            }).then(res => {
              res.present();
            });
          }
        });
    }
   

    console.log(this.loginForm.value);
  }
  
  
  
}

import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AlertController, IonRouterOutlet } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

 
  registerForm:FormGroup;
  isSubmitted = false;
  constructor(private ionRouter:IonRouterOutlet,public fb:FormBuilder,private alertController:AlertController,private authService:AuthService,private router:Router) { }

  ngOnInit() {
    this.ionRouter.swipeGesture=false;
    this.isSubmitted = false;
    this.registerForm = this.fb.group(
      {
      // email: new FormControl(null,[Validators.email,Validators.required]),
      // password: new FormControl(null,[Validators.required,Validators.minLength(8)]),
      // firstName: new FormControl(null,[Validators.required]),
      // lastName: new FormControl(null,[Validators.required]),}
      email:new FormControl('',[Validators.email,Validators.required]),
      password:new FormControl('',[Validators.required]),
      firstName:new FormControl('',[Validators.required]),
      lastName:new FormControl('',[Validators.required]),}
    )
  }


  register(){
  console.log("Poziva se ovo " + this.registerForm.get('firstName').touched);
  this.isSubmitted = true;
   console.log(this.registerForm);
    if(this.registerForm.valid){
      this.authService.register(this.registerForm.value).subscribe(
        (res)=>{
          if(res.response=="success"){
            this.alertController.create({
              header: 'Registered',
              message: 'You have been successfully registered!',
              buttons: ['OK']
            }).then(res => {
              res.present();
              this.router.navigate(['/login']);
            });
          }else if(res.email!=null){
            this.alertController.create({
              header: 'Error',
              message: ' The email has already been taken!',
              buttons: ['OK']
            }).then(res => {
              res.present();
            });
           
          }
        });
    }else{
      console.log("NIje validno");
      // this.isSubmitted = false;
    }
    
  
  }
}

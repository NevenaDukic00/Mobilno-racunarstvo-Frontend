import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string = "http://localhost:8000/api/";
  constructor(private http: HttpClient) { }
  
  login(user:User):Observable<any>{
    return this.http.post(this.url + "login",user);
  }


  logout(user:User):Observable<any>{
    return this.http.post(this.url,user);
  
  }
  public getUserStatus() {
   return sessionStorage.getItem('currentUser');
  }

  public setSessionData(res:any){
    console.log(res);
    if(res.success=="true"){
    sessionStorage.setItem('token', res.access_token);
    sessionStorage.setItem('user', String(res.user.email));
    sessionStorage.setItem('userId', String(res.user.id));
    sessionStorage.setItem('name', String(res.user.firstName) + " " +  String(res.user.lastName));
    this.setUserStatus();
    }
  }

  public setUserStatus(){
    if(sessionStorage.getItem('user')=="admin@gmail.com"){
      sessionStorage.setItem('currentUser','admin');
    }else{
      console.log("Obican user!");
      sessionStorage.setItem("currentUser","user");
    }
  }
  public logOut(){
    sessionStorage.clear();
  }

  register(user:User):Observable<any>{
    return this.http.post(this.url + "register",user);
  }
  getAuthToken(){
    return sessionStorage.getItem("token");
  }

  getUser(){
    return Number(sessionStorage.getItem("userId"));
  }
 
  getUserName(){
    return sessionStorage.getItem("name");
  }
}

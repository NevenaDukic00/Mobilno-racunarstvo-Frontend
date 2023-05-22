import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
// import {Http, Headers} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Genre } from '../interfaces/genre';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { type } from 'os';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  @ViewChild('f', {static:true}) form: NgForm;
  @Input() title:string;

   genres: Genre[] = new Array();

  constructor(public http: HttpClient, public alertCtrl: AlertController, private route:Router) {
   }


  ngOnInit() {
    // this.getGenres().subscribe(genre =>{
    //   this.genres= genre as Genre[];
    // })
    // this.setGenres();

    this.getGenres().subscribe((res)=>{
      this.genres=res.data;
    })
  }

  onAddMovie(){
    if(!this.form.valid){
      return;
    }
    else{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let movie ={
      title: this.form.value['title'],
      genre_id: this.form.value['genre_id'],
      description: this.form.value['description'],
      date: this.form.value['date'],
      duration: this.form.value['duration'],
      image: this.form.value['image'],
      price: this.form.value['price'],
      rating: this.form.value['rating'],
      amount:this.form.value['amount']
    }
    console.log(typeof(movie.rating*1))
    if(!parseInt(movie.rating)|| !parseInt(movie.amount)||!parseInt(movie.price)){
      console.log("Usao ovde");
      this.alertCtrl.create({
        header: 'Error',
        message: "Values for rating, price and amount have to be numbers!",
        buttons: ['OK']
      }).then(res => {
        res.present();
      });
    }else{
    console.log(movie.genre_id);
    this.http.post('http://localhost:8000/api/movies', movie)
    //.map(res=> res.json())
    .subscribe( (data)=>{
      console.log(data);
    })
    ;
    console.log("dosao do kraja dodavanja", movie);
    this.alertCtrl.create({
      header: 'Success',
      message: 'The movie is added successfully!',
      buttons: [{
        text:"OK",
        handler:()=>{
          this.goHome();
        }
      }]
    }).then(res => {
      res.present();
    });
  }
  }
  }

  goHome(){
    this.route.navigate(['/home']);
  }

  getGenres():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('responseType', 'text').set('Accept', 'application/json')
    ;
    console.log(this.http.get('http://localhost:8000/api/genres'));
    return this.http.get('http://localhost:8000/api/genres');
  }

  
}

import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { AlertController, IonRefresher, IonRefresherContent, IonRouterOutlet } from '@ionic/angular';
import { Movie } from '../interfaces/movie';
import { TicketNetwork } from '../interfaces/ticket-network';
import { CartService } from '../services/cart.service';
import { MovieService } from '../services/movie.service';
import { FormControl } from '@angular/forms';
import { Observable, startWith } from 'rxjs';
import { AuthService } from '../services/auth.service';

// za search verovatno moras da uradis npm install ng2-search-filter

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  searchTerm: string;
  movies:Movie[] = new Array();
  @Input() addT = new EventEmitter<Movie>();
  @Input() updateM = new Number;

  constructor(private ionRouter:IonRouterOutlet,private authServie:AuthService, private cartService:CartService,private movieService:MovieService, private alertCont: AlertController){
  }

  
  ngOnInit(): void {
    this.ionRouter.swipeGesture=false;
    this.loadData();
  }

  addTicket(m:Movie){
    console.log("Treba da se doda: " + m.title);
    this.cartService.addTicket(m);
  }
  removeTicket(m:Movie){
    this.cartService.removeTicket(m);
  }
  public loadData(){
    console.log("Usao ovde");
    this.movieService.getMovies().subscribe((res)=>{
      console.log(res);
      this.movies = res.data;
      this.cartService.setMovies(res.data);
      console.log(this.movies);});
    
  }
  removeMovie(m:Movie){
    console.log(m);
    this.cartService.removeMovie(m);
    this.movieService.delete(m).subscribe((res)=>
    {
      console.log(res);
      if(res.response==="success"){
        this.movies.forEach((element,index)=>{
          if(element.id==m.id) this.movies.splice(index,1);
       });
      }
    });
  }

  onSort(){
    this.movies= this.movies.sort((b,a)=> b.price- a.price);
  }

  handleRefresh(event) {
    setTimeout(() => {
      this.loadData();
      event.target.complete();
    }, 2000);
  }

}

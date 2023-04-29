import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { TicketNetwork } from '../interfaces/ticket-network';
import { CartService } from '../services/cart.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  movies:Movie[] = new Array();
  @Input() addT = new EventEmitter<Movie>();
  constructor(private cartService:CartService,private movieService:MovieService){}

  
  ngOnInit(): void {
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
    this.movieService.getMovies().subscribe((res)=>{console.log(res);this.movies = res.data;this.cartService.setMovies(res.data);console.log(this.movies);});
    
  }
  removeMovie(m:Movie){
    console.log(m);
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

}

import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../interfaces/movie';
import { MovieService } from '../services/movie.service';
import { IonicModule } from '@ionic/angular';
import { TicketNetwork } from '../interfaces/ticket-network';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent  implements OnInit {

  public pipe = new DatePipe('en-US');
  @Input() movie: Movie | undefined;

  @Output() addT = new EventEmitter<Movie>();

  // @Output() removeMovie = new EventEmitter<Movie>();
  constructor(private router:Router,private movieService:MovieService,public authService:AuthService){}
  ngOnInit(): void {
    console.log(this.movie);
    console.log("Usao ovde");
  }


  addTicket(){
    console.log("Usao ovde");
    this.addT.emit(this.movie);
  }
  removeTicket(){

  }
  // bookTickets(){
  //   console.log("Current movie je: " + this.movie);
  //   this.ticketService.setCurrentMovie(this.movie);
  //   this.router.navigate(['/reservation']);
  // }

  // isLoggedIn(){
  //   return this.authSerivce.getUserStatus();
  // }

  // deleteMovie(){
  //   this.movieService.delete(this.movie).subscribe((res)=>{
  //     console.log(res);
  //     if(res.response=="success"){
  //       alert("Movie has been successfully deleted!");
  //       this.removeMovie.emit(this.movie);
  //     }else{
  //       alert("Deliting movie failed!");
  //     }
    
  //   });
  // }

}

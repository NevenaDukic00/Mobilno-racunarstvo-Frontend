import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../interfaces/movie';
import { MovieService } from '../services/movie.service';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent  implements OnInit {

  public pipe = new DatePipe('en-US');
  @Input() movie: Movie | undefined;
  // @Output() removeMovie = new EventEmitter<Movie>();
  constructor(private router:Router,private movieService:MovieService){}
  ngOnInit(): void {
    console.log(this.movie);
    console.log("Usao ovde");
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

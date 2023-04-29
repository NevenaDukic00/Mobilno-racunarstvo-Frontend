import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../interfaces/movie';
import { MovieService } from '../services/movie.service';
import { IonicModule } from '@ionic/angular';
import { TicketNetwork } from '../interfaces/ticket-network';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent  implements OnInit {

  public pipe = new DatePipe('en-US');
  @Input() movie: Movie | undefined;

  @Output() addT = new EventEmitter<Movie>();
  @Output() removeT = new EventEmitter<Movie>();
  @Output() removeMovie = new EventEmitter<Movie>();
  // @Output() removeMovie = new EventEmitter<Movie>();
  constructor(private router:Router,private movieService:MovieService,public authService:AuthService,public cartService:CartService,public alertController: AlertController){}
  ngOnInit(): void {
    console.log(this.movie);
    console.log("Usao ovde");
  }


  addTicket(){
    console.log("Usao ovde");
    this.addT.emit(this.movie);
  }
  removeTicket(){
    this.removeT.emit(this.movie);
  }
  deleteMovie(){
      this.alertController.create({
        header: 'Confirmation',
        message: 'Do you want to delete movie?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              console.log('Delete');
              this.removeMovie.emit(this.movie);
            }
          },
          {
            text: 'No',
            handler: () => {
              console.log('Dont delete');
            }
          }
        ]
      }).then(res => {
        res.present();
      });
  
  }
 
 

}

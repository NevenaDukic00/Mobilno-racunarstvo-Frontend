import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../interfaces/movie';
import { MovieService } from '../services/movie.service';
import { IonicModule, ModalController } from '@ionic/angular';
import { TicketNetwork } from '../interfaces/ticket-network';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { AlertController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';
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
  Mprice: number;

  res:string = "";
  // @Output() removeMovie = new EventEmitter<Movie>();
  constructor(private router:Router,private movieService:MovieService,public authService:AuthService,public cartService:CartService,public alertController: AlertController, public modalCont: ModalController){}
  ngOnInit(): void {
    console.log(this.movie);
    console.log("Usao ovde");
  }


  addTicket(){
    console.log("Usao ovde");
    if(this.movie.amount>0){
      // this.movie.amount--;
      this.addT.emit(this.movie);
    }
  }
  removeTicket(){
    if( this.cartService.getNumOfTickets(this.movie)>0){
      this.removeT.emit(this.movie);
    }
  
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

  async openModal(){
    const modal = await this.modalCont.create({
      component:ModalComponent,
    });
    modal.present();

    modal.onDidDismiss().then((data)=>{
      
      this.Mprice = data.data.price;
      this.movie.price = this.Mprice;
      console.log("Po zatvaranju modala, u movie komponenti je cena: ", this.Mprice);
      this.updateMovie(this.Mprice);
    })
  }
 
  updateMovie(data: Number){
    console.log("Kada salje u servis cena je: ", data);
    this.movieService.changeMoviePrice(this.movie, data).subscribe((res)=>{
      if(res.response==="success"){
        this.alertController.create({
          header: 'Success',
          message: 'The movie is updated successfully!',
          buttons:["OK"]
        });
      }
      else{
        this.alertController.create({
          header: 'Error',
          message: 'The movie can not be updated!',
          buttons:["OK"]
        });
      }
    })
  }

}

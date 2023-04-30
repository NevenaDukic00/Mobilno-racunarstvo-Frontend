import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, IonRouterOutlet } from '@ionic/angular';
import { Ticket } from '../interfaces/ticket';
import { TicketNetwork } from '../interfaces/ticket-network';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor(private ionRouter:IonRouterOutlet,private cartService:CartService,private authService:AuthService,public alertController: AlertController) {
   }
   public pipe = new DatePipe('en-US');

  tickets:Ticket[] = new Array();
  ngOnInit():void {
    this.ionRouter.swipeGesture=false;
     console.log("U cart ide po ticekts");
     this.tickets = this.cartService.getTickets();
  }

  bookTickets(){
    this.tickets.forEach(element => {
      if(element.amount!=0){
        this.cartService.bookTicket({movie_id:element.movie.id,amount:element.amount}).subscribe((res)=>
        {console.log(res);});
      }
    });
    
      console.log("Usao ovde");
      this.alertController.create({
        header: 'Booked tickets',
        message: 'You have successfully booked tickets!',
        buttons: ['OK']
      }).then(res1 => {
        res1.present();
      });
    
    this.tickets = new Array();
    this.cartService.removeFromCart();
  }
}

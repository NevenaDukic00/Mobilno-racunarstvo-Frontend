import { Component, OnInit } from '@angular/core';
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

  constructor(private cartService:CartService,private authService:AuthService) {
   }

  tickets:Ticket[] = new Array();
  ngOnInit():void {
     console.log("U cart ide po ticekts");
     this.tickets = this.cartService.getTickets();
  }

  bookTickets(){
    this.tickets.forEach(element => {
      if(element.amount!=0){
        this.cartService.bookTicket({movie_id:element.movie.id,amount:element.amount}).subscribe((res)=>console.log(res));
  
      }
       });
  }
}
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';
import { Ticket } from '../interfaces/ticket';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.page.html',
  styleUrls: ['./my-tickets.page.scss'],
})
export class MyTicketsPage implements OnInit {

  tickets:Ticket[] = new Array();
  tickets_all:Ticket[] = new Array();
  constructor(private ionRouter:IonRouterOutlet,private cartService:CartService) { }
  public pipe = new DatePipe('en-US');

  ngOnInit() {
    this.ionRouter.swipeGesture=false;
    console.log("Ide po moje karte");
    this.cartService.getMyTickets().subscribe((res)=>{
      this.tickets_all = res.data;
      console.log("Svi tiketi!");
      console.log(this.tickets_all);
      this.tickets_all.forEach(element => {
        if(element.movie!=null){
          this.tickets.push(element);
        }
      });
      console.log("Ne nul ticketi");
     console.log(this.tickets);
    });
  }

}

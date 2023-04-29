import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { Ticket } from '../interfaces/ticket';
import { TicketNetwork } from '../interfaces/ticket-network';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  movies:Movie[];
  tickets:Ticket[] = new Array();
  tickets_selected:Ticket[] = new Array();
  url:string = "http://localhost:8000/api/";
  amount:number = 0;
  constructor(private http: HttpClient,private authService:AuthService) {}

  setMovies(movies:Movie[]){
    console.log("Ubacuje u niz");
    this.movies = movies;
    this.movies.forEach(m => {
      this.tickets.push({movie:m,amount:0})
    });
    // console.log("Punimo na pocetku!");
    // console.log(this.tickets);
  }

  getTickets():Array<Ticket>{
     console.log("Ide po krate");
     console.log(this.tickets);
    return this.tickets;
  }
  addTicket(m:Movie){
    this.tickets.forEach(element => {
      if(element.movie.id==m.id){
        element.amount++;
      }
    });
    console.log(this.tickets);
  }

  removeTicket(m:Movie){
    this.tickets.forEach(element => {
      if(element.movie.id==m.id && element.amount>0){
        element.amount--;
      }
    });
  }
  getNumOfTickets(m:Movie){
    this.tickets.forEach(element => {
      if(element.movie.id==m.id){
        this.amount =  element.amount;
      }
    });
    return this.amount;
  }
  bookTicket(ticketN:TicketNetwork){
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                 .set('Accept', 'application/json')
                                 .set('responseType', 'text')
                                 .set('Authorization',  'Bearer ' + this.authService.getAuthToken());
    return this.http.post(this.url + "tickets",ticketN,{ headers: headers });
  }

//   getProducts() {
//     return this.data;
//   }

//   getCart() {
//     return this.cart;
//   }

//   getCartItemCount() {
//     return this.cartItemCount;
//   }

//   addProduct(product) {
//     let added = false;
//     for (let p of this.cart) {
//       if (p.id === product.id) {
//         p.amount += 1;
//         added = true;
//         break;
//       }
//     }
//     if (!added) {
//       product.amount = 1;
//       this.cart.push(product);
//     }
//     this.cartItemCount.next(this.cartItemCount.value + 1);
//   }

//   decreaseProduct(product) {
//     for (let [index, p] of this.cart.entries()) {
//       if (p.id === product.id) {
//         p.amount -= 1;
//         if (p.amount == 0) {
//           this.cart.splice(index, 1);
//         }
//       }
//     }
//     this.cartItemCount.next(this.cartItemCount.value - 1);
//   }

//   removeProduct(product) {
//     for (let [index, p] of this.cart.entries()) {
//       if (p.id === product.id) {
//         this.cartItemCount.next(this.cartItemCount.value - p.amount);
//         this.cart.splice(index, 1);
//       }
//     }
//   }
// }
}

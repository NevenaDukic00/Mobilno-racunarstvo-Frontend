import { Injectable } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { Ticket } from '../interfaces/ticket';
import { TicketNetwork } from '../interfaces/ticket-network';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  movies:Movie[];
  tickets:TicketNetwork[] = new Array();
  constructor() {}

  setMovies(movies:Movie[]){
    this.movies = movies;
    this.movies.forEach(m => {
      this.tickets.push({movie_id:m.id,amount:0})
    });
    console.log(this.tickets);
  }
  addTicket(m:Movie){
    this.tickets.forEach(element => {
      if(element.movie_id==m.id){
        element.amount++;
      }
    });
    console.log(this.tickets);
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

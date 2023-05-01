import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private cartService:CartService,private route:Router,public authService:AuthService) {}
  logout() {
    this.cartService.removeFromCart();
    this.authService.logOut();
  }
}

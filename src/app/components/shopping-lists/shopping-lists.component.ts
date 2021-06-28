import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
  styleUrls: ['./shopping-lists.component.css']
})
export class ShoppingListsComponent {

  constructor(public authService: AuthService) { }

  login() {
    this.authService.loginViaGoogle().subscribe();
  }

  logout() {
    this.authService.logout().subscribe();
  }
}

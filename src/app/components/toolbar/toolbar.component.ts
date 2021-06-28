import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.loginViaGoogle().subscribe();
  }

  logout() {
    this.authService.logout().subscribe();
  }

}

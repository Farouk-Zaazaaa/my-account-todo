import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private readonly _AuthService = inject(AuthService)

  isLogged:boolean = this._AuthService.isLoggedIn

  logout(){
    this._AuthService.logout()
  }

}

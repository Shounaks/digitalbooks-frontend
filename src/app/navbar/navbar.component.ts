import { Component } from '@angular/core';
import { LoginUserService } from '../services/user-service/loginuser.service';
import { User } from '../DTOs/User';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  constructor(public loginService:LoginUserService,
    private cookieService: CookieService){ 
  }

  flushCookies():void{
    this.cookieService.deleteAll();
    this.loginService.user = null;
    sessionStorage.removeItem('token');
  }
}

import { Component } from '@angular/core';
import { LoginUserService } from '../loginuser.service';
import { User } from '../DTOs/User';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  user?:User;
  constructor(public loginService:LoginUserService,
    private cookieService: CookieService){ 
    this.user = loginService.user;
  }

  flushCookies():void{
    this.cookieService.deleteAll();
  }
}

import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginUserService } from './loginuser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'login-form';

  constructor(private cookieService:CookieService,private userService:LoginUserService){}
  ngOnInit(){
    var isPreviousSessionPresent = this.cookieService.get('userData')
    if(isPreviousSessionPresent){
      this.userService.user = JSON.parse(isPreviousSessionPresent);
    }
  }
}

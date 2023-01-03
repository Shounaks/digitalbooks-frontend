import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { User } from './DTOs/User';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {
  public user ?: User;

  private baseUrl = "http://localhost:8080/api/v1/digitalbooks/";
  private loginUrl = this.baseUrl + "sign-in";
  private registerUrl = this.baseUrl + "sign-up";

  constructor(private httpClient:HttpClient,private cookieService: CookieService) { }

  loginUser(user: User): Observable<any>{
    // console.log("Trying to Log-in: " + user.emailId + " With Password: " + user.password)
    return this.httpClient.post<User>(this.loginUrl,user);
  }

  registerUser(user:User){
    this.httpClient.post<User>(this.registerUrl,user).subscribe(
      success => {
        this.user = success;
        this.cookieService.set("userData",JSON.stringify(success));
      }
    );
  }
}

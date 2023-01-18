import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { User } from '../../DTOs/User';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {
  public user: any;

  // private authenticationURL = "http://localhost:8080/api/v1/digitalbooks/authentication/";
  private AWS_URL = "3.110.23.139";
  private authenticationURL = "http://" + this.AWS_URL + ":8080/api/v1/digitalbooks/authentication/";
  private loginUrl = this.authenticationURL + "sign-in";
  private registerUrl = this.authenticationURL + "sign-up";

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  loginUser(user: { emailId: string, password: string }): Observable<any> {
    return this.httpClient.post<User>(this.loginUrl, user);
  }

  registerUser(user: User) {
    this.httpClient.post<User>(this.registerUrl, user).subscribe(
      success => {
        this.user = success;
        sessionStorage.setItem('token', user.token);
        this.cookieService.set("userData", JSON.stringify(success));
      }
    );
  }
}

import { Component } from '@angular/core';
import { LoginUserService } from '../loginuser.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage!:string;
  constructor(
    private userService:LoginUserService,
    private formBuilder:FormBuilder,
    private router: Router,
    private cookieService: CookieService){}
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      emailId:['',[Validators.required,Validators.email,Validators.min(3)]],
      password:['',[Validators.required,Validators.min(1)]],
    });
  }

  userLogin(){
    this.userService.loginUser(this.loginForm.value).subscribe(
      success=>{ 
        this.userService.user = success;
        this.cookieService.set("userData",JSON.stringify(success));
        this.router.navigate([''])
      },
      error=>{
        console.log(error);
        this.errorMessage = error.error.errorMessage;
      }
      );
  }
}

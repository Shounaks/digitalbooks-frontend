import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { LoginUserService } from '../services/user-service/loginuser.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerationForm !: FormGroup;
  errorMessage : string = "";

  constructor(
    private userService: LoginUserService,
    private formBuilder: FormBuilder,private router: Router,
    private logger:NGXLogger) { }

  ngOnInit(): void {
    this.registerationForm = this.formBuilder.group({
      name:['',[Validators.required,Validators.pattern('^[A-Za-z ]+$'),Validators.minLength(1)]],
      emailId:['',[Validators.required,Validators.email,Validators.minLength(3),Validators.maxLength(50)]],
      password:['',[Validators.required,Validators.minLength(5),Validators.maxLength(50)]],
      authorUser:[false,[Validators.required]]
    });
  }

  registerUser() { 
    this.userService.registerUser(this.registerationForm.value);
    this.router.navigate([''])
  }
}

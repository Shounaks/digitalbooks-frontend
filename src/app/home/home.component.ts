import { Component } from '@angular/core';
import { LoginUserService } from '../services/user-service/loginuser.service';
import { User } from '../DTOs/User';
import { BookService } from '../services/book-service/bookservice.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user?:User;
  searchQuery:string = "";
  queryResult!: Array<any>;
  constructor(public loginService:LoginUserService,public bookService:BookService,private logger:NGXLogger){
    this.user = loginService.user;
  }
  
  salutation():string{
    return this.user?.authorUser? "Hello Author":"Hello User";
  }

  onEnter(searchQuery:string) { 
    // console.log(searchQuery)
    this.searchQuery = searchQuery;
    this.bookService.searchBookQuery(searchQuery,searchQuery,searchQuery,searchQuery,searchQuery).subscribe(
      success=>{
        console.log(success)
        this.queryResult = success;
      },
      error=>{this.logger.warn(error)}
    );
  }
}

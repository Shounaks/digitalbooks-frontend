import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginUserService } from 'src/app/loginuser.service';
import { BookService } from 'src/app/services/bookservice.service';
import {BookSubscription} from 'src/app/DTOs/BookSubscription'
import {Book} from 'src/app/DTOs/Book'
import {Subscription} from 'src/app/DTOs/Subscription'

@Component({
  selector: 'app-bookinfo',
  templateUrl: './bookinfo.component.html',
  styleUrls: ['./bookinfo.component.css']
})
export class BookinfoComponent {
  // bookId : number = -1;
  subscriptionId !: number;
  bookSubscription: BookSubscription = {
    book: this.emptyBook(),
    subscription: this.emptySubscription()
  };

  constructor(private router : ActivatedRoute,private bookService:BookService,private userService : LoginUserService){
    
  }

  ngOnInit(){
    this.populateData();
    // this.bookService.retrieveAllUnblockedBooks().subscribe(
    //   success =>{
    //     console.log(success)
    //     console.log(success.find((x: { bookId: number; }) => x.bookId == this.bookId))
    //   },
    //   error => console.log(error)
    // );
  }

  populateData(){
    this.router.params.subscribe(success=>{this.subscriptionId = success['subscriptionId'];});
    this.bookService.retrieveSubscribedBookData(this.userService.user!.emailId,this.subscriptionId).subscribe(
      success=> this.bookSubscription = success,
      error => console.log(error)
    )
  }

  emptyBook() : Book {
    return {
        bookId: 0,
        title: "",
        category: "",
        price: 0,
        authorId: 0,
        publisher: "",
        publishedDate: new Date(),
        content: "",
        blocked: false,
        };
    }
  emptySubscription() : Subscription{
    return {
      id : 0,
      bookId: 0,
      subscriptionDate: new Date()
    };
  }
}

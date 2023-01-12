import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginUserService } from 'src/app/services/user-service/loginuser.service';
import { BookService } from 'src/app/services/book-service/bookservice.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent {
  bookId: number = -1;
  subscriptionId: number = -1;
  title: string = "";
  content: string = "";
  constructor(private router: ActivatedRoute, private bookService: BookService, private userService: LoginUserService) {
    this.populateData();
  }

  populateData() {
    this.router.params.subscribe(success => {
       this.subscriptionId = success['subscriptionId']; 
       this.bookId = success['bookId']; 
      });
    let x = this.bookService
      .retrieveSubscribedBookData(this.userService.user!.emailId, this.subscriptionId)
      .subscribe(x => {this.content = x.book.content;this.title = x.book.title;});
      // success => { this.content = success; console.log(success) },
      // error => console.log(error)
    // )
  }
}

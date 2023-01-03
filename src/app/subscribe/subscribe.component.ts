import { getLocaleDateFormat } from '@angular/common';
import { Component } from '@angular/core';
import { BookService } from '../services/bookservice.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent {
  allUnblockedBooks!: Array<any>;
  allSubscribedBooks!: Array<any>;

  constructor(private bookService:BookService){
    
  }

  ngOnInit(){
    this.populateAllData();
  }

  subscribe(bookId:number){
    this.bookService.subscribeToBook(bookId).subscribe(
      success => this.populateAllData(),
      error => console.log(error)
    );
  }

  unsubscribe(bookId:number){
    this.bookService.unsubscribeToBook(bookId).subscribe(
      success => this.populateAllData(),
      error => console.log(error)
    );
  }

  public isSubscriptionDatePost24Hours(date : string) : boolean{
    let dateFormat = new Date(date);
    const _24HoursInMilliseconds = 24 * 60 * 60 * 1000;
   
    const After24Hours = dateFormat.valueOf() + _24HoursInMilliseconds;
    return After24Hours < Date.now();
  }

  populateAllData(){
    this.bookService.retrieveAllUnblockedBooks().subscribe(
      success => {this.allUnblockedBooks = success;},
      error => console.log(error)
    );

    this.bookService.retrieveAllSubscribedBooks().subscribe(
      success => {this.allSubscribedBooks = success;
        this.allUnblockedBooks = this.populateUnsubscribedBooks(this.allUnblockedBooks,this.allSubscribedBooks);
      },
      error => console.log(error)
    )
  }

  public populateUnsubscribedBooks(bookList1:Array<any>,bookList2:Array<any>){
    return bookList1.filter(x => !bookList2.flatMap(x=> x.book.bookId).includes(x.bookId));
  }
}

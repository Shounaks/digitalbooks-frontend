import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../DTOs/Book';
import { BookService } from '../services/bookservice.service';

@Component({
  selector: 'app-generalbookinfo',
  templateUrl: './generalbookinfo.component.html',
  styleUrls: ['./generalbookinfo.component.css']
})
export class GeneralbookinfoComponent {
  book ?: Book = this.emptyBook();
  constructor(private bookService:BookService,private activatedRoute : ActivatedRoute){
    
  }

  ngOnInit(){
    this.populateData()
  }

  populateData(){
    let bookId: number;
    this.activatedRoute.params.subscribe(success=>{bookId = success['bookId'];});
    this.bookService.retrieveAllUnblockedBooks().subscribe(x => this.book = (x as Book[]).find(x => x.bookId == bookId));
    console.log(this.book)
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
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Book } from '../DTOs/Book';
import { BookService } from '../services/book-service/bookservice.service';

@Component({
  selector: 'app-generalbookinfo',
  templateUrl: './generalbookinfo.component.html',
  styleUrls: ['./generalbookinfo.component.css']
})
export class GeneralbookinfoComponent {
  book?: Book = this.emptyBook();
  constructor(private bookService: BookService, private activatedRoute: ActivatedRoute,private logger:NGXLogger) {

  }

  ngOnInit() {
    this.populateData()
  }

  populateData() {
    let bookId: number;
    this.activatedRoute.params.subscribe(success => { bookId = success['bookId']; });
    this.bookService.retrieveAllUnblockedBooksWithoutJwtToken().subscribe(x => this.book = (x as Book[]).find(x => x.bookId == bookId),error=> this.logger.log(error));
    // console.log(this.book)
  }

  emptyBook(): Book {
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

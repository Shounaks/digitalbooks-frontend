import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Book } from 'src/app/DTOs/Book';
import { LoginUserService } from 'src/app/services/user-service/loginuser.service';
import { BookService } from 'src/app/services/book-service/bookservice.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-blockbook',
  templateUrl: './blockbook.component.html',
  styleUrls: ['./blockbook.component.css']
})
export class BlockbookComponent {
  previousBooksBySameUser!: Book[];

  constructor(private bookService: BookService, public userService: LoginUserService,private logger:NGXLogger) {

  }

  ngOnInit() {
    this.populateData();
  }

  toggleBlock(event: any, book: Book) {
    event.target.disabled = true;
    this.bookService.toggleBookBlock(parseInt(this.userService.user!.id), book.bookId, book.blocked).subscribe(
      success => { this.populateData() },
      error => { this.logger.warn(error) }
    );
  }

  populateData() {
    this.bookService.searchAllBooksByAuthor().subscribe(
      success => {
        this.previousBooksBySameUser = success;
        // console.log(this.previousBooksBySameUser.length)
      },
      error => { this.logger.warn(error) }
    );
  }
}

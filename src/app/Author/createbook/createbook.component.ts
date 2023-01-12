import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/DTOs/Book';
import { User } from 'src/app/DTOs/User';
import { LoginUserService } from 'src/app/services/user-service/loginuser.service';
import { BookService } from 'src/app/services/book-service/bookservice.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-createbook',
  templateUrl: './createbook.component.html',
  styleUrls: ['./createbook.component.css']
})
export class CreateBookComponent {
  createBookForm!: FormGroup;
  errorMessage:string="";
  user?:User;
  previousBooksBySameUser!: Array<any>;
  constructor(private bookService:BookService,
    public userService:LoginUserService,
    private formBuilder:FormBuilder,
    private logger:NGXLogger){
      this.user = userService.user;
    }

  ngOnInit(){
    this.createBookForm = this.formBuilder.group({
      title:['',[Validators.required,Validators.minLength(2)]],
      category:['',[Validators.minLength(2),Validators.pattern("^([0-9A-Za-z \-])+$")]],
      price:[,[Validators.required,Validators.min(1)]],
      authorId:[parseInt(this.user!.id),[Validators.required]],
      publisher:['',[Validators.minLength(5)]],
      publishedDate:['',[]],
      content:['',[]],
      blocked:[false,[Validators.required]]
    });
    this.createBookForm.get('author')?.disable();
    this.getAllBookByAuthor();
  }

  createBook(){
    this.bookService.addBook(this.createBookForm.value).subscribe(
      success=>{
        // console.log(success);
        this.getAllBookByAuthor();
      },
      error =>{this.logger.warn(error)}
    );
  }

  getAllBookByAuthor(){
    this.bookService.searchAllBooksByAuthor().subscribe(
      success =>{
        this.previousBooksBySameUser = success
      },
      error => {this.logger.warn("Error Occured While Retrieving the books:" + error)}
    );
  }
}

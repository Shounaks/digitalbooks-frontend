import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/DTOs/User';
import { LoginUserService } from 'src/app/loginuser.service';
import { BookService } from 'src/app/services/bookservice.service';

@Component({
  selector: 'app-updatebook',
  templateUrl: './updatebook.component.html',
  styleUrls: ['./updatebook.component.css']
})
export class UpdatebookComponent {
  updateBookForm!: FormGroup;
  errorMessage:string="";
  previousBooksBySameUser!: Array<any>;

  constructor(private bookService:BookService,
    public userService:LoginUserService,
    private formBuilder:FormBuilder){}

  ngOnInit(){
    this.updateBookForm = this.formBuilder.group({
      bookId:['',[Validators.required]],
      title:['',[Validators.required,Validators.minLength(2)]],
      category:['',[Validators.minLength(2)]],
      price:[0,[Validators.required,Validators.min(0)]],
      authorId:[parseInt(this.userService.user!.id),[Validators.required]],
      publisher:['',[Validators.minLength(5)]],
      publishedDate:['',[]],
      content:['',[]],
      blocked:[false,[Validators.required]]
    });
    this.updateBookForm.get('author')?.disable();
    this.getAllBookByAuthor();
  }

  getAllBookByAuthor(){
    this.bookService.searchAllBooksByAuthor().subscribe(
      success =>{
        this.previousBooksBySameUser = success;
      },
      error => {console.log("Error Occured While Retrieving the books")}
    );
  }

  updateBook(){
    this.bookService.updateBook(this.updateBookForm.value).subscribe(
      success => {
        console.log(success);
        this.getAllBookByAuthor();
      },
      error => {
        console.log(error)
      }
    );
  }
}

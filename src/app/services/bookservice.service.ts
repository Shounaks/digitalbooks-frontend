import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../DTOs/Book';
import { User } from '../DTOs/User';
import { LoginUserService } from '../loginuser.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  user?:User;
  private backendUrl = "http://localhost:8080/api/v1/digitalbooks/";

  constructor(
    private httpClient:HttpClient,
    public loginUserService:LoginUserService) { 
    this.user = loginUserService.user;
  }

  addBook(book:Book):Observable<any>{
    let addBookUrl : string = this.backendUrl + parseInt(this.loginUserService.user!.id) + "/books";
    return this.httpClient.post(addBookUrl,book);
  }

  updateBook(book:Book):Observable<any>{
    let updateBookUrl:string = this.backendUrl + parseInt(this.loginUserService.user!.id) + "/books/" + book.bookId;
    return this.httpClient.put(updateBookUrl,book);
  }

  searchBookAll(query: string): Observable<any>{
    let params : HttpParams = new HttpParams().set("search",query);
    return this.httpClient.get(this.backendUrl+"/search",{params:params});
  }

  searchAllBooksByAuthor(): Observable<any>{
    return this.httpClient.get(this.backendUrl+this.loginUserService.user!.id+"/books");
  }

  searchBookQuery(category: string,title: string,author :string,price: string,publisher:string): Observable<any>{
    let params : HttpParams = new HttpParams()
        .set("category",category)
        .set("title",title)
        .set("author",author)
        .set("price",price)
        .set("publisher",publisher);
    return this.httpClient.get(this.backendUrl+"search",{params:params});
  }

  toggleBookBlock(authorId:number,bookId:number,block:boolean): Observable<any>{
    let blockUrl:string = this.backendUrl + authorId + "/books/" + bookId;
    let params : HttpParams = new HttpParams().set("block",!block);
    return this.httpClient.get(blockUrl,{params:params});
  }

  retrieveAllUnblockedBooks() : Observable<any>{
    let retrieveUrl:string = this.backendUrl;
    return this.httpClient.get(retrieveUrl);
  }

  retrieveAllSubscribedBooks() : Observable<any>{
    let retrieveUrl:string = this.backendUrl + "subscribe/" + parseInt(this.loginUserService.user!.id);
    return this.httpClient.get(retrieveUrl);
  }

  subscribeToBook(bookId:number): Observable<any>{
    let subscribeUrl:string = this.backendUrl + "subscribe/" + bookId + "/" + parseInt(this.loginUserService.user!.id);
    console.log(subscribeUrl)
    return this.httpClient.get(subscribeUrl);
  }

  unsubscribeToBook(bookId:number): Observable<any>{
    let subscribeUrl:string = this.backendUrl + "unsubscribe/" + bookId + "/" + parseInt(this.loginUserService.user!.id);
    return this.httpClient.get(subscribeUrl);
  }

  retrieveSubscribedBookData(emailId:string,subscriptionId:number) : Observable<any>{
    let subscribedDataUrl = this.backendUrl + `readers/${emailId}/books/${subscriptionId}`;
    return this.httpClient.get(subscribedDataUrl);
  }
  retrieveSubscribedBookDataContent(emailId:string,subscriptionId:number) : Observable<string>{
    let subscribedDataContentUrl = this.backendUrl + `readers/${emailId}/books/${subscriptionId}/read`;
    return this.httpClient.get<string>(subscribedDataContentUrl);
  }
}

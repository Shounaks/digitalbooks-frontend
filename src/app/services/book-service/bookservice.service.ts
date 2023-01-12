import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Book } from '../../DTOs/Book';
import { User } from '../../DTOs/User';
import { LoginUserService } from '../user-service/loginuser.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private backendUrl = "http://localhost:8080/api/v1/digitalbooks/";
  private bookUrl = this.backendUrl + "books/";
  private authorUrl = this.backendUrl + "author/";
  private userUrl = this.backendUrl + "user/";

  constructor(
    private httpClient: HttpClient,
    public loginUserService: LoginUserService) {

  }

  httpHeaderWithJwtToken(): HttpHeaders {
    let token = this.loginUserService.user.token;//sessionStorage.getItem('token');
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + token)
    return headers;
  }

  addBook(book: Book): Observable<any> {
    let addBookUrl: string = this.authorUrl + parseInt(this.loginUserService.user!.id) + "/books";
    return this.httpClient.post(addBookUrl, book, { headers: this.httpHeaderWithJwtToken() });

  }

  updateBook(book: Book): Observable<any> {
    let updateBookUrl: string = this.authorUrl + parseInt(this.loginUserService.user!.id) + "/books/" + book.bookId;
    return this.httpClient.put(updateBookUrl, book, { headers: this.httpHeaderWithJwtToken() });
  }

  searchBookAll(query: string): Observable<any> {
    let params: HttpParams = new HttpParams().set("search", query);
    return this.httpClient.get(this.backendUrl + "/search", { params: params, headers: this.httpHeaderWithJwtToken() });
  }

  searchAllBooksByAuthor(): Observable<any> {
    return this.httpClient.get(this.bookUrl + this.loginUserService.user!.id, { headers: this.httpHeaderWithJwtToken() });
  }

  searchBookQuery(category: string, title: string, author: string, price: string, publisher: string): Observable<any> {
    let params: HttpParams = new HttpParams()
      .set("category", category)
      .set("title", title)
      .set("author", author)
      .set("price", price)
      .set("publisher", publisher);
    return this.httpClient.get(this.bookUrl + "search", { params: params });
  }

  toggleBookBlock(authorId: number, bookId: number, block: boolean): Observable<any> {
    let blockUrl: string = this.authorUrl + authorId + "/books/" + bookId;
    let params: HttpParams = new HttpParams().set("block", !block);
    return this.httpClient.get(blockUrl, { params: params, headers: this.httpHeaderWithJwtToken() });
  }

  retrieveAllUnblockedBooks(): Observable<any> {
    let retrieveUrl: string = this.bookUrl;
    return this.httpClient.get(retrieveUrl, { headers: this.httpHeaderWithJwtToken() });
  }
  
  retrieveAllUnblockedBooksWithoutJwtToken(): Observable<any> {
    let retrieveUrl: string = this.bookUrl;
    return this.httpClient.get(retrieveUrl);
  }

  retrieveAllSubscribedBooks(): Observable<any> {
    let retrieveUrl: string = this.userUrl + "subscribe/" + parseInt(this.loginUserService.user!.id);
    return this.httpClient.get(retrieveUrl, { headers: this.httpHeaderWithJwtToken() });
  }

  subscribeToBook(bookId: number): Observable<any> {
    let subscribeUrl: string = this.userUrl + "subscribe/" + bookId + "/" + parseInt(this.loginUserService.user!.id);
    // console.log(subscribeUrl)
    return this.httpClient.get(subscribeUrl, { headers: this.httpHeaderWithJwtToken() });
  }

  unsubscribeToBook(bookId: number): Observable<any> {
    let subscribeUrl: string = this.userUrl + "unsubscribe/" + bookId + "/" + parseInt(this.loginUserService.user!.id);
    return this.httpClient.get(subscribeUrl, { headers: this.httpHeaderWithJwtToken() });
  }

  retrieveSubscribedBookData(emailId: string, subscriptionId: number): Observable<any> {
    let subscribedDataUrl = this.userUrl + `readers/${emailId}/books/${subscriptionId}`;
    return this.httpClient.get(subscribedDataUrl, { headers: this.httpHeaderWithJwtToken() });
  }
  retrieveSubscribedBookDataContent(emailId: string, subscriptionId: number): Observable<string> {
    let subscribedDataContentUrl = this.userUrl + `readers/${emailId}/books/${subscriptionId}/read`;
    return this.httpClient.get<string>(subscribedDataContentUrl, { headers: this.httpHeaderWithJwtToken() });
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { NavbarComponent } from './navbar/navbar.component';
import { CreateBookComponent } from './Author/createbook/createbook.component';
import { CookieService } from 'ngx-cookie-service';
import { BlockbookComponent } from './Author/blockbook/blockbook.component';
import { UpdatebookComponent } from './Author/updatebook/updatebook.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { BookinfoComponent } from './Reader/bookinfo/bookinfo.component';
import { ReadComponent } from './Reader/read/read.component';
import { GeneralbookinfoComponent } from './generalbookinfo/generalbookinfo.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    CreateBookComponent,
    BlockbookComponent,
    UpdatebookComponent,
    SubscribeComponent,
    BookinfoComponent,
    ReadComponent,
    GeneralbookinfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

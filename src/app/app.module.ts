import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { NavbarComponent } from './navbar/navbar.component';
import { CreateBookComponent } from './author/createbook/createbook.component';
import { CookieService } from 'ngx-cookie-service';
import { BlockbookComponent } from './author/blockbook/blockbook.component';
import { UpdatebookComponent } from './author/updatebook/updatebook.component';
import { SubscribeComponent } from './user/subscribe/subscribe.component';
import { BookinfoComponent } from './user/bookinfo/bookinfo.component';
import { ReadComponent } from './user/read/read.component';
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
    GeneralbookinfoComponent,
  ],
  imports: [
    LoggerModule.forRoot({ level: NgxLoggerLevel.WARN }),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

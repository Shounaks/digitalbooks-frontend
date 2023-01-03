import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BlockbookComponent } from './Author/blockbook/blockbook.component';
import { CreateBookComponent } from './Author/createbook/createbook.component';
import { UpdatebookComponent } from './Author/updatebook/updatebook.component';
import { GeneralbookinfoComponent } from './generalbookinfo/generalbookinfo.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BookinfoComponent } from './Reader/bookinfo/bookinfo.component';
import { ReadComponent } from './Reader/read/read.component';
import { RegisterComponent } from './register/register.component';
import { SubscribeComponent } from './subscribe/subscribe.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'createBook',component:CreateBookComponent},
  {path:'updateBook',component:UpdatebookComponent},
  {path:'blockBook',component:BlockbookComponent},
  {path:'subscribe',component:SubscribeComponent},
  {path:'bookInfo/:subscriptionId',component:BookinfoComponent},
  {path:'bookInfo/:subscriptionId/:bookId/read',component:ReadComponent},
  {path:'book/:bookId',component:GeneralbookinfoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { ReadComponent } from './read/read.component';
import { BookinfoComponent } from './bookinfo/bookinfo.component';

const routes: Routes = [
  {path:'subscribe',component:SubscribeComponent},
  {path:'subscribe/:subscriptionId',component:BookinfoComponent},
  {path:'subscribe/:subscriptionId/:bookId/read',component:ReadComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ]
})
export class UserModule { }

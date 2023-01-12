import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBookComponent } from './createbook/createbook.component';
import { UpdatebookComponent } from './updatebook/updatebook.component';
import { BlockbookComponent } from './blockbook/blockbook.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path:'createBook',component:CreateBookComponent},
  {path:'updateBook',component:UpdatebookComponent},
  {path:'blockBook',component:BlockbookComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class AuthorModuleModule { }

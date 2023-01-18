import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralbookinfoComponent } from './generalbookinfo/generalbookinfo.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './shared/auth.guard';
import { AuthorGuard } from './shared/author.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'book/:bookId', component: GeneralbookinfoComponent },
  { path: 'author', loadChildren: () => import('./author/author.module').then(m => m.AuthorModuleModule), canActivate: [AuthGuard, AuthorGuard] },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

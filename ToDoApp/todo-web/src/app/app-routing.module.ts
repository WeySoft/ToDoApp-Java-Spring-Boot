import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { TodoComponent } from './component/todo/todo.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './component/register/register.component';


const routes: Routes = [
  {path: '', canActivate: [AuthGuard], component: TodoComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//componts
import { AppComponent } from './app.component';
import { TodoComponent } from './component/todo/todo.component';
import { LoginComponent } from './component/login/login.component';
import { NavigationSidenavComponent } from './component/navigation-sidenav/navigation-sidenav.component';
import { NavigationHeaderComponent } from './component/navigation-header/navigation-header.component';
import { TodoItemsListComponent } from './component/todo-items-list/todo-items-list.component';
import { RegisterComponent } from './component/register/register.component';
import { ProfileComponent } from './component/profile/profile.component';
//services
import { UserService, ToDoItemsService, AuthenticationService} from './service/api';
import { NotificationService } from './service/notification.service';

//material
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';

//flex box
import { FlexLayoutModule } from '@angular/flex-layout';



//interceptor
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/errorinterceptor';
import { DialogComponent } from './component/dialog/dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    LoginComponent,
    NavigationSidenavComponent,
    NavigationHeaderComponent,
    ProfileComponent,
    TodoItemsListComponent,
    RegisterComponent,
    DialogComponent
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [UserService, ToDoItemsService, AuthenticationService, NotificationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

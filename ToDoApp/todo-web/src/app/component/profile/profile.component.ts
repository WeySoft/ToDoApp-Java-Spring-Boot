import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/model/user';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ToDoItem } from 'src/app/model/models';
import { AuthenticationService, UserService } from 'src/app/service/api';
import { NotificationService } from 'src/app/service/notification.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser= new User();
  user = new User();
  constructor(private dialog : MatDialog,
              private _authenticationService: AuthenticationService,
              private _userService : UserService,
              private _notificationService : NotificationService
              ) {
                this._authenticationService.currentUser.subscribe(res => {
                  this.currentUser = res;
                  this.user = { ...this.currentUser };
                });
              }  
  dialogUser(user, item) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {currentUser : user }  
    });
    //TODO: change If else to switch
    if(item === "username") {
    dialogRef.afterClosed().subscribe(res => {
      this.user.username = res;
      this.updateUser(this.user);
    })
  }
    else if (item === "firstName"){
      dialogRef.afterClosed().subscribe(res => {
        this.user.firstName = res;
        this.updateUser(this.user);
      })
    }

    else if (item === "lastName"){
      dialogRef.afterClosed().subscribe(res => {
        this.user.lastName = res;
        this.updateUser(this.user);
      })
    }
    else {
      console.log("error");
    }
  }
  updateUser(user){
    console.log(user);
    this._userService.apiUserIdPut(user.id, user).subscribe(() => {
      this._notificationService.showNotification("Erfolgreich geändert!", "success-notification");
    },
    () => {
      this._notificationService.showNotification("Etwas ist schief gelaufen :(", "error-notification");
    });
    this._authenticationService.updateUser(user);
  }


  ngOnInit(): void {
  }

}

import { Component, OnInit } from "@angular/core";
import { User } from "src/app/model/user";
import { AuthenticationService } from "src/app/service/api";
import { Router } from "@angular/router";
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginUser = new User();

  constructor(
    private _notificationService: NotificationService,
    private _authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    if (this.loginUser.username && this.loginUser.password) {
      this._authenticationService.authenticateUser(this.loginUser).subscribe(
        result => {
          this.router.navigate(["/"]);
        },
        error => {
          //TODO Notification
          this._notificationService.showNotification('Anmeldung Fehlgeschlagen', 'Error')
          
        }
      );
    }
    else {
      //TODO Notification
      this._notificationService.showNotification('Bitte beide felder ausfüllen', 'Error')
    }
  }
}

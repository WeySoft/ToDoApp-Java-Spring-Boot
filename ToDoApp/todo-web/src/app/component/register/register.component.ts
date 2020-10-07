import { Component, OnInit, ViewChild } from "@angular/core";
import { User } from "src/app/model/user";
import { UserService, AuthenticationService } from "src/app/service/api";
import { Router } from "@angular/router";
import { NotificationService } from "src/app/service/notification.service";
import { pipe } from "rxjs";
import { concatMap } from "rxjs/operators";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  @ViewChild("registerUserForm") form;
  newUser = new User();
  passwordRepeat: string;

  //input validation
  registerUserFormGroup: FormGroup;

  constructor(
    private _authenticateService: AuthenticationService,
    private _userService: UserService,
    private router: Router,
    private _notificationService: NotificationService
  ) {
    this.registerUserFormGroup = new FormGroup({
      username: new FormControl("", Validators.required),
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      passwordRepeat: new FormControl("", Validators.required)
    });
  }

  ngOnInit(): void {}

  registerUser() {
    if (this.registerUserFormGroup.value.password === this.registerUserFormGroup.value.passwordRepeat && this.registerUserFormGroup.valid) {
      this.newUser.username = this.registerUserFormGroup.value.username;
      this.newUser.firstName = this.registerUserFormGroup.value.firstName;
      this.newUser.lastName = this.registerUserFormGroup.value.lastName;
      this.newUser.password = this.registerUserFormGroup.value.password;

      this._userService
        .apiUserPost(this.newUser)
        .pipe(
          concatMap(() => {
            return this._authenticateService.authenticateUser(this.newUser);
          })
        )
        .subscribe(
          () => {
            this._notificationService.showNotification(
              "Registrierung erfolgreich",
              "Success"
            );
            this.router.navigate(["/"]);
          },
          error => {
            if (error.status === 409) {
              this._notificationService.showNotification(
                "Benutzername wird bereits verwendent",
                "Error"
              );
            } else {
              this._notificationService.showNotification(
                "Registrierung fehlgeschlagen!",
                "Error"
              );
            }
          }
        );
    } else {
      this._notificationService.showNotification(
        "Passwörter stimmen nicht überein",
        "Error"
      );
    }
    this.registerUserFormGroup.reset();
    this.form.resetForm();
  }
}

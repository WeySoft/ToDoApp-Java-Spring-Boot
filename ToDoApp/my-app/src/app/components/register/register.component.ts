import { Component, OnInit, ViewChild } from "@angular/core";
import { User } from "src/app/model/user";
import { Router } from "@angular/router";
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
    private router: Router,

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
    }
    console.log(this.newUser);
  }
}

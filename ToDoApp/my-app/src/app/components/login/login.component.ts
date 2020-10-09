import { Component, OnInit } from "@angular/core";
import { User } from "src/app/model/user";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginUser = new User();

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    
  }
}

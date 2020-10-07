import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, BehaviorSubject } from "rxjs";

import { map } from "rxjs/operators";

import { User } from "../model/user";

import { Router } from "@angular/router";

@Injectable()
export class AuthenticationService {
  protected basePath = "https://localhost:5001//auth";
  public defaultHeaders = new HttpHeaders();
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(protected httpClient: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public authenticateUser(loginUser: User): Observable<User> {
    return this.httpClient.post<User>(this.basePath, loginUser).pipe(
      map(user => {
        // login successful? if there is a jwt token in response
        if (user && user.token) {
          // store user with token in local storage to keep user logged in between page refreshes
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    this.router.navigate(["/login"]);
  }

  updateUser(updatedUser: User) {
    const oldUser = JSON.parse(localStorage.getItem('currentUser'));
    updatedUser.token = oldUser.token;
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    this.currentUserSubject.next(updatedUser);
}
}

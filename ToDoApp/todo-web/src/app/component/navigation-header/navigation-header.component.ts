import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthenticationService } from "src/app/service/api";
import { User } from "src/app/model/user";


@Component({
  selector: "app-navigation-header",
  templateUrl: "./navigation-header.component.html",
  styleUrls: ["./navigation-header.component.scss"]
})
export class NavigationHeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter();
  currentUser: User;


  constructor(private _authenticationService: AuthenticationService) {
    this._authenticationService.currentUser.subscribe(
      res => (this.currentUser = res)
    );
  }

  ngOnInit(): void {}

  logout() {
    this._authenticationService.logout();
  }

  onToggleSidenav(){
    this.sidenavToggle.emit();
  }
}

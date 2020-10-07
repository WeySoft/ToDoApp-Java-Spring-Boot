import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/api';

@Component({
  selector: 'app-navigation-sidenav',
  templateUrl: './navigation-sidenav.component.html',
  styleUrls: ['./navigation-sidenav.component.scss']
})
export class NavigationSidenavComponent implements OnInit {
@Output() sidenavClose = new EventEmitter();
currentUser: User;


  constructor(private _authenticationService: AuthenticationService) {
    this._authenticationService.currentUser.subscribe(res => this.currentUser = res)
  }
  ngOnInit(): void {
  }

  onSidenavClose() {
    this.sidenavClose.emit();
  }

  logout() {
    this._authenticationService.logout();
  }
}
import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../controller/service/token-storage.service";

@Component({
  selector: 'app-dyalhom',
  templateUrl: './dyalhom.component.html',
  styleUrls: ['./dyalhom.component.scss']
})
export class DyalhomComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMINOTE');
      this.showModeratorBoard = this.roles.includes('ROLE_PROFESSEUR');

      this.username = user.username;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}

import { Component, OnInit } from '@angular/core';
import {UserService} from "../controller/service/user.service";
import {AnneeUniversitaireService} from "../controller/service/annee-universitaire.service";

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content = '';

  constructor(private ann:AnneeUniversitaireService,private userService: UserService) { }

  ngOnInit() {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

    jj() {
        this.ann.findAllyears();
    }
}

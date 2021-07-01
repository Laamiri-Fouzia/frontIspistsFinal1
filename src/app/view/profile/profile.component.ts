import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../controller/service/token-storage.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  roles=new Array();

  constructor(private token: TokenStorageService,private router:Router) { }
  gotTo(viewEtudiant: string) {
    this.router.navigate([`${viewEtudiant}`]);
  }
  ngOnInit() {
    this.currentUser = this.token.getUser();
    if(this.currentUser.roles.includes('ROLE_ADMINOTE'))
      this.roles.push('Responsable des notes')
    if(this.currentUser.roles.includes('ROLE_COORDONNATEURMODULE'))
      this.roles.push('Coordonnateur des Modules ')
    if(this.currentUser.roles.includes('ROLE_ADMINABSENCE'))
      this.roles.push('Responsable des absences')
    if(this.currentUser.roles.includes('ROLE_PROFESSEUR'))
      this.roles.push('Professeur')

  }
}

import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {AppMainComponent} from "../../../app.main.component";

@Component({
  selector: 'app-espace-etudiant',
  templateUrl: './espace-etudiant.component.html',
  styleUrls: ['./espace-etudiant.component.scss']
})
export class EspaceEtudiantComponent implements OnInit {

  constructor(public appMain: AppMainComponent,private router:Router) {
  }

  items: MenuItem[];
  model: any[];
  ngOnInit() {
    this.model = [
      {
        label: 'Accueil', icon: 'pi pi-fw pi-home', routerLink: ['/']

      }, {
        label: 'Espace Etudiant', icon: 'pi pi-book', routerLink: ['/espaces/etudiant']

      }, {
        label: 'Formation', icon: 'pi pi-question-circle', routerLink: ['/view/formation']

      },
    ];
  }

  gotToNote(viewEtudiant: string) {
    this.router.navigate([`${viewEtudiant}`]);
  }
  onMenuClick(event) {
    this.appMain.onMenuClick(event);
  }
  gotToAbsence(viewAbsenceEtudiant: string) {
    this.router.navigate([`${viewAbsenceEtudiant}`]);
  }
}

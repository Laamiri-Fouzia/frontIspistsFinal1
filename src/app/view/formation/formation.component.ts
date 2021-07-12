import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AppMainComponent} from "../../app.main.component";

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent implements OnInit {
  model: any[];
  constructor(private router:Router,public appMain: AppMainComponent) { }

  ngOnInit(): void {
    this.model = [
      {
        label: 'Accueil', icon: 'pi pi-fw pi-home', routerLink: ['/']

      }, {
        label: 'Espace Etudiant', icon: 'pi pi-book', routerLink: ['/espaces/etudiant']

      }, {
        label: 'Formation', icon: 'pi pi-question-circle', routerLink: ['/view/formation']

      },
      {
        label: 'Aide', icon: 'pi pi-fw pi-home', routerLink: ['/view/aide']

      }
    ];
  }
  gotToAccueil(accueilEspace: string) {
    this.router.navigate([`${accueilEspace}`]);
  }
  onMenuClick(event) {
    this.appMain.onMenuClick(event);
  }

}

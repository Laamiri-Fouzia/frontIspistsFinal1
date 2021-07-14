import { Component, OnInit } from '@angular/core';
import {AppMainComponent} from "../../app.main.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-aide',
  templateUrl: './aide.component.html',
  styleUrls: ['./aide.component.scss']
})
export class AideComponent implements OnInit {
  model: any[];
  constructor(private router: Router, public appMain: AppMainComponent) { }

  ngOnInit(): void {
    this.model = [
      {
        label: 'Accueil', icon: 'pi pi-fw pi-home', routerLink: ['/']

      }, {
        label: 'Espace Etudiant', icon: 'pi pi-book', routerLink: ['/espaces/etudiant']

      }, {
        label: 'Formation', icon: 'pi pi-info-circle', routerLink: ['/view/formation']

      },
      {
        label: 'Aide', icon: 'pi pi-question-circle', routerLink: ['/view/aide']

      }
    ];
  }


  onMenuClick(event) {
    this.appMain.onMenuClick(event);
  }

  gotTo(viewEtudiant: string) {
    this.router.navigate([`${viewEtudiant}`]);
  }
}

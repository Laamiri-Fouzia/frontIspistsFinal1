import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";
import {AppMainComponent} from "../../app.main.component";
import {ModuleSemestreOptionService} from "../../controller/service/module-semestre-option.service";
import {Filiere} from "../../controller/model/filiere.model";
import {MyOption} from "../../controller/model/my-option.model";
import {MyModule} from "../../controller/model/myModule.model";
import {Etudiant} from "../../controller/model/etudiant.model";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {



  model: any[];

  constructor(public app: AppComponent, public appMain: AppMainComponent,private router:Router,private moduleSemestreOptionService:ModuleSemestreOptionService) { }

  ngOnInit() {
    this.model = [
      {
        label: 'Accueil', icon: 'pi pi-fw pi-home', routerLink: ['/']

      }, {
        label: 'Epaces', icon: 'pi pi-desktop', routerLink: ['/accueil/espace']

      }, {
        label: 'Formation', icon: 'pi pi-book', routerLink: ['/accueil/espace']

      }, {
        label: 'Aide', icon: 'pi pi-question-circle', routerLink: ['/accueil/espace']

      },
    ];
    this.moduleSemestreOptionService.getAllFilieres();
    this.moduleSemestreOptionService.getAllEtudiants();
    this.moduleSemestreOptionService.getAllOptions();
    this.moduleSemestreOptionService.getAllModules();
  }

  onMenuClick(event) {
    this.appMain.onMenuClick(event);
  }


  gotToPage(accueilEspace: string) {
    this.router.navigate([`${accueilEspace}`]);
  }
  get filieres(): Array<Filiere> {
    return this.moduleSemestreOptionService.filieres;
  }

  set filieres(value: Array<Filiere>) {
    this.moduleSemestreOptionService.filieres = value;
  }

  get options(): Array<MyOption> {
    return this.moduleSemestreOptionService.options;
  }

  set options(value: Array<MyOption>) {
    this.moduleSemestreOptionService.options = value;
  }

  get modules(): Array<MyModule> {
    return this.moduleSemestreOptionService.modules;
  }

  set modules(value: Array<MyModule>) {
    this.moduleSemestreOptionService.modules = value;
  }

  get etudiants(): Array<Etudiant> {
    return this.moduleSemestreOptionService.etudiants;
  }

  set etudiants(value: Array<Etudiant>) {
    this.moduleSemestreOptionService.etudiants = value;
  }
}
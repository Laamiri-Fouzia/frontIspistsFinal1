import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MyModuleService} from "../../controller/service/myModule.service";
import {AppMainComponent} from "../../app.main.component";

@Component({
  selector: 'app-espaces',
  templateUrl: './espaces.component.html',
  styleUrls: ['./espaces.component.scss']
})
export class EspacesComponent implements OnInit {constructor(private router:Router,private service: MyModuleService,public appMain: AppMainComponent) { }
  model
  ngOnInit(): void {
    this.model = [
      {
        label: 'Accueil', icon: 'pi pi-fw pi-home', routerLink: ['/']

      }, {
        label: 'Epaces', icon: 'pi pi-desktop', routerLink: ['/accueil/espace']

      }, {
        label: 'Formation', icon: 'pi pi-book', routerLink: ['/view/formation']

      }, {
        label: 'Aide', icon: 'pi pi-question-circle', routerLink: ['/accueil/aide']

      },
    ];
  }
  onMenuClick(event) {
    this.appMain.onMenuClick(event);
  }

  gotToAccueil(accueilEspace: string) {
    this.router.navigate([`${accueilEspace}`]);
  }
  gotToAdmin(viewLogin: string) {
    this.router.navigate([`${viewLogin}`]);
  }

  gotToCoor(viewLogin: string) {
    this.router.navigate([`${viewLogin}`]);
  }
  gotToProf(viewLogin: string) {
    this.router.navigate([`${viewLogin}`]);
  }

  gotToEtudiant(espaceEtudiant: string) {
    this.router.navigate([`${espaceEtudiant}`]);
  }

  get submitted(): boolean {
    return this.service.submitted;
  }

  set submitted(value: boolean) {
    this.service.submitted = value;
  }

  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }


  public openCreate() {
    //this.selected = new MyModule();
    this.submitted = false;
    this.createDialog = true;
  }

}
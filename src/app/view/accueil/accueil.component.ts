import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";
import {AppMainComponent} from "../../app.main.component";
import {ModuleSemestreOptionService} from "../../controller/service/module-semestre-option.service";
import {Filiere} from "../../controller/model/filiere.model";
import {MyOption} from "../../controller/model/my-option.model";
import {MyModule} from "../../controller/model/myModule.model";
import {Etudiant} from "../../controller/model/etudiant.model";
import {TokenStorageService} from "../../controller/service/token-storage.service";

@Component({
    selector: 'app-accueil',
    templateUrl: './accueil.component.html',
    styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {


    model: any[];
    roles: string[] = [];
    url: string

    constructor(public app: AppComponent, public appMain: AppMainComponent,private tokenStorageService:TokenStorageService,private router: Router, private moduleSemestreOptionService: ModuleSemestreOptionService) {
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

    getEspace() {
        if (this.roles.includes('ROLE_ADMINOTE'))
            this.url = 'view/AdminNoteNote';
        else if (this.roles.includes('ROLE_PROFESSEUR'))
            this.url = 'view/professeur';
        else if (this.roles.includes('ROLE_COORDONNATEURMODULE'))
            this.url = 'view/coordonatteurModule';
        else if (this.roles.includes('ROLE_ADMINABSENCE'))
            this.url = 'view/AdminAbsence';
        else if (this.roles.includes('ROLE_PROFESSEUR') && this.roles.includes('ROLE_COORDONNATEURMODULE'))
            this.url = 'accueil/espace';
    }

    go() {
        if (!!this.tokenStorageService.getToken()) {
            const user = this.tokenStorageService.getUser();
            this.roles = this.tokenStorageService.getUser().roles;
            this.getEspace();
            //  this.reloadPage();
            this.router.navigate([`${this.url}`]);

        }else{
            this.router.navigate([`view/login`]);
        }

    }
}
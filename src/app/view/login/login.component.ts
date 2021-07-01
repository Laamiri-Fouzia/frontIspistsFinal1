import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../controller/service/auth.service";
import {TokenStorageService} from "../../controller/service/token-storage.service";
import {AnneeUniversitaire} from "../../controller/model/anneeUniversitaire";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AppMainComponent} from "../../app.main.component";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(public appMain: AppMainComponent,private router:Router,private http: HttpClient,private authService: AuthService, private tokenStorage: TokenStorageService) { }


    get LoginSucces(): boolean {
        return this.authService.LoginSucces;
    }

    set LoginSucces(value: boolean) {
        this.authService.LoginSucces = value;
    }

    get userName(): string {
        return this.authService.userName;
    }

    set userName(value: string) {
        this.authService.userName = value;
    }
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
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
    onMenuClick(event) {
        this.appMain.onMenuClick(event);
    }
  url:string
   getEspace(){
      if(this.roles.includes('ROLE_ADMINOTE'))
          this.url= 'view/AdminNoteNote';
      if(this.roles.includes('ROLE_PROFESSEUR'))
          this.url=  'view/professeur';
      if(this.roles.includes('ROLE_COORDONNATEURMODULE'))
          this.url=  'view/coordonatteurModule';
      if(this.roles.includes('ROLE_ADMINABSENCE'))
          this.url=  'view/AdminAbsence';
       if(this.roles.includes('ROLE_PROFESSEUR') && this.roles.includes('ROLE_COORDONNATEURMODULE'))
          this.url=  'accueil/espace';
       console.log(this.url)
   }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.LoginSucces=true;
        this.userName=data.username;
        this.roles = this.tokenStorage.getUser().roles;
          console.log(this.roles)
        this.getEspace();

      //  this.reloadPage();
          this.router.navigate([`${this.url}`]);

      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  public findAllyears(){
    this.http.get<Array<AnneeUniversitaire>>('http://localhost:8036/ispits-project/annee-universitaire/').subscribe(
        data => {
          console.log(data)
        },error => {
          console.log(error);
        });
  }

    go() {
        this.router.navigate([``]);
    }
}

import {Component, OnInit} from '@angular/core';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import {TokenStorageService} from "./controller/service/token-storage.service";
import {Router} from "@angular/router";
import {AuthService} from "./controller/service/auth.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit{

    constructor(private router:Router,private authService:AuthService,private tokenStorageService: TokenStorageService,public app: AppComponent, public appMain: AppMainComponent) {}


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

    logout1(): void {
        this.tokenStorageService.signOut();
        this.router.navigate([``]);
        this.LoginSucces=false;
    }

    logout2(): void {
        alert('tny')
        window.location.reload();
    }

    goTo() {
        this.router.navigate([`view/profile`]);
    }
    ngOnInit() {
        this.LoginSucces = !!this.tokenStorageService.getToken();

        if (this.LoginSucces) {
            const user = this.tokenStorageService.getUser();
            this.userName = user.username;
        }
    }
}

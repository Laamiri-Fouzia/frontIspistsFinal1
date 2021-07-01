/*import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {TokenStorageService} from "./controller/service/token-storage.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{

    layoutMode = 'horizontal';

    lightMenu = false;

    topbarColor = 'layout-topbar-goodForUs';

    inlineUser = false;

    isRTL = false;

    inputStyle = 'outlined';

    ripple = true;

    constructor(private tokenStorageService: TokenStorageService,private primengConfig: PrimeNGConfig) { }


///______________________
    private roles: string[];
    isLoggedIn = false;
    showAdminBoard = false;
    showModeratorBoard = false;
    username: string;

    ngOnInit() {
        this.isLoggedIn = !!this.tokenStorageService.getToken();

        if (this.isLoggedIn) {
            this.primengConfig.ripple = true;
            const user = this.tokenStorageService.getUser();
            this.roles = user.roles;
            this.showAdminBoard = this.roles.includes('ROLE_ADMINOTE');
            this.showModeratorBoard = this.roles.includes('ROLE_PROFESSEUR');

            this.username = user.username;
        }
    }

    logout() {
        this.tokenStorageService.signOut();
        window.location.reload();
    }

}*/
import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{

    layoutMode = 'horizontal';

    lightMenu = false;

    topbarColor = 'layout-topbar-goodForUs';

    inlineUser = false;

    isRTL = false;

    inputStyle = 'outlined';

    ripple = true;

    constructor(private primengConfig: PrimeNGConfig) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }


}
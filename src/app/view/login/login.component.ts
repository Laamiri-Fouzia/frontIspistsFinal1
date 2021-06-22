import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../controller/service/auth.service";
import {MyModuleService} from "../../controller/service/myModule.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  constructor(private router:Router,private authService: AuthService,private service: MyModuleService) {}

  ngOnInit(): void {
  }

  handleLogin() {
    this.authService.login(this.username, this.password).subscribe((result) => {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful';
      // redirect to main page
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });
  }

  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }
  gotToAdmin(viewLogin: string) {
    this.router.navigate([`${viewLogin}`]);

  }
    goto() {
         if(this.username=='admin'  && this.password=='admin')
           this.gotToAdmin('view/AdminNoteNote')
      else
         {
           alert('le nom d\'utilisateur ou le mot de pass sont incorrects !!')
           this.gotToAdmin('view/login');
         }
    }
}

import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../controller/service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles =new Set<string> ();
  role1: string;
  role2: string;
  rolesOptions: any[];

  constructor(private router:Router,private authService: AuthService) {
    this.rolesOptions=[
      {label:'Responsable de notes' , value: "admin note"},
      {label: "Responsable d'absences", value: "admin absence"},
      {label: "Coordonnateur Module", value: "coordonnateur module"},
      {label: "Professeur", value: "professeur"},
    ];

  }

  ngOnInit() {
  }
  gotTo(viewEtudiant: string) {
    this.router.navigate([`${viewEtudiant}`]);
  }
  onSubmit() {
    console.log(this.form);
    if(this.role1)
      this.roles.add(this.role1)
    if(this.role2)
      this.roles.add(this.role2)

    this.authService.register(this.form,this.role1,this.role2).subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
    );
  }
}

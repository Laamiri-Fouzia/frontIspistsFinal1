import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-module-or-affectation',
  templateUrl: './module-or-affectation.component.html',
  styleUrls: ['./module-or-affectation.component.scss']
})
export class ModuleOrAffectationComponent implements OnInit {

  constructor(private router:Router) {
  }

  items: MenuItem[];

  ngOnInit() {

  }

  gotTo(viewEtudiant: string) {
    this.router.navigate([`${viewEtudiant}`]);
  }


}

import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-filiere',
  templateUrl: './filiere.component.html',
  styleUrls: ['./filiere.component.scss']
})
export class FiliereComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {

  }

  gotTo(viewEtudiant: string) {
    this.router.navigate([`${viewEtudiant}`]);
  }

}

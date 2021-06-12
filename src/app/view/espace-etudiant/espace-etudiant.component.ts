import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-espace-etudiant',
  templateUrl: './espace-etudiant.component.html',
  styleUrls: ['./espace-etudiant.component.scss']
})
export class EspaceEtudiantComponent implements OnInit {

  constructor() {
  }

  items: MenuItem[];

  ngOnInit() {

  }
}

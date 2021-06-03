import { Component, OnInit } from '@angular/core';
import {AnneeUniversitaire} from "../../../controller/model/anneeUniversitaire";
import {AnneeUniversitaireService} from "../../../controller/service/annee-universitaire.service";
import {AbsenceService} from "../../../controller/service/absence.service";
import {Absence} from "../../../controller/model/absence.model";

@Component({
  selector: 'app-absence-etudiant',
  templateUrl: './absence-etudiant.component.html',
  styleUrls: ['./absence-etudiant.component.scss']
})
export class AbsenceEtudiantComponent implements OnInit {
  annee: string;
  semstre: string;
  semestres: any[]=new Array();
  cne: string;

  constructor(private annéeUniversitaireService: AnneeUniversitaireService,private absenceService:AbsenceService) {
    this.semestres=[
      {label: "Semestre :", value: null},
      {label: "Semestre 1", value: 1},
      {label: "Semestre 2", value: 2},
      {label:  "Semestre 3",value: 3},
      {label:  "Semestre 4",value: 4},
      {label: "Semestre 5", value: 5},
      {label: "Semestre 6", value: 6}
    ];
  }

  ngOnInit(): void {
    this.annéeUniversitaireService.findAllyears();
  }

  get absences(): Array<Absence> {
    return this.absenceService.absences;
  }

  get years(): Array<AnneeUniversitaire> {
    return this.annéeUniversitaireService.years;
  }

  searchAbsence(annee: string, semstre: string, cne: string) {
      this.absenceService.searchAbsence(annee, semstre, cne)
  }
}

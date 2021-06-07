import { Component, OnInit } from '@angular/core';
import {ConsultationAbsenceService} from "../../../controller/service/consultation-absence.service";
import {Absence} from "../../../controller/model/absence.model";

@Component({
  selector: 'app-consultation-absences',
  templateUrl: './consultation-absences.component.html',
  styleUrls: ['./consultation-absences.component.scss']
})
export class ConsultationAbsencesComponent implements OnInit {
  input;
    etats: any;
  etatAbs: any;

  constructor(private consultationAbsenceService:ConsultationAbsenceService) {
    this.etats=[
      {label: "accepte", value: "accepte"},
      {label: "refuse", value: "refuse"},
    ];
  }

  ngOnInit(): void {
  }

  get selectors(): Array<Absence> {
    return this.consultationAbsenceService.selectors;
  }

  set selectors(value: Array<Absence>) {
    this.consultationAbsenceService.selectors = value;
  }

  get etatAbse(): string {
    return this.consultationAbsenceService.etatAbse;
  }

  set etatAbse(value: string) {
    this.consultationAbsenceService.etatAbse = value;
  }
  get absence(): Absence {
    return this.consultationAbsenceService.absence;
  }

  set absence(value: Absence) {
    this.consultationAbsenceService.absence = value;
  }

  get absences(): Array<Absence> {
    return this.consultationAbsenceService.absences;
  }

  set absences(value: Array<Absence>) {
    this.consultationAbsenceService.absences = value;
  }

  chercheAbsences(input:Date) {
    this.consultationAbsenceService.chercheAbsences(input);
  }

  change1() {
    this.etatAbse=this.etatAbs;
  }

  updateAbsences(absences: Array<Absence>,selectors:Array<Absence>) {
   this.consultationAbsenceService.updateAbsences(absences,selectors) ;
  }
}

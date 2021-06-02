import { Component, OnInit } from '@angular/core';
import {AbsenceService} from "../../../controller/service/absence.service";
import {InscriptionEtudiantService} from "../../../controller/service/inscription-etudiant.service";
import {InscriptionEtudiantModule} from "../../../controller/model/inscription-etudiant-module.model";

@Component({
  selector: 'app-absence-edit',
  templateUrl: './absence-edit.component.html',
  styleUrls: ['./absence-edit.component.scss']
})
export class AbsenceEditComponent implements OnInit {

  constructor(private absenceService:AbsenceService,private inscriptionEtudiantService:InscriptionEtudiantService) {}

  toggle = true;
  value1: any;
  cols: any;


  private initCol() {
    this.cols = [
      {field: 'cne', header: 'cne'},
      {field: 'nom', header: 'nom'}

    ];
  }

  enableDisableRule() {
    this.toggle = !this.toggle;
  }
  ngOnInit(): void {

  }
  get editDialog(): boolean {
    return this.absenceService.editDialog;
  }

  get inscriptionEtudiants(): Array<InscriptionEtudiantModule> {
    return this.inscriptionEtudiantService.inscriptionEtudiants;
  }
  get selects(): Array<InscriptionEtudiantModule> {
    return this.absenceService.selects;
  }
  set selects(value: Array<InscriptionEtudiantModule>) {
    this.absenceService.selects = value;
  }
  set editDialog(value: boolean) {
    this.absenceService.editDialog = value;
  }
    choisirParametre() {
       this.absenceService.editDialog=true;
    }

  validerAbsence() {
    this.absenceService.validerAbsence();
    console.log(this.selects);
  }
  get displayTable(): boolean {
    return this.absenceService.displayTable;
  }

  set displayTable(value: boolean) {
    this.absenceService.displayTable = value;
  }
}

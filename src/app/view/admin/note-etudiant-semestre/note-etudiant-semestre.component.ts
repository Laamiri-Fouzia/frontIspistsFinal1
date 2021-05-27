import { Component, OnInit } from '@angular/core';
import {NoteEtudiantSemestreService} from "../../../controller/service/note-etudiant-semestre.service";
import {MyOption} from "../../../controller/model/my-option.model";
import {NoteEtudiantSemestre} from "../../../controller/model/note-etudiant-semestre.model";
import {Filiere} from "../../../controller/model/filiere.model";

@Component({
  selector: 'app-note-etudiant-semestre',
  templateUrl: './note-etudiant-semestre.component.html',
  styleUrls: ['./note-etudiant-semestre.component.scss']
})
export class NoteEtudiantSemestreComponent implements OnInit {
  years: any[];
  semestres: any[];
  input1;
  input2;
  input3;
  fil;

  get noteSemestre(): NoteEtudiantSemestre {
    return this.noteEtudiantSemestreService.noteSemestre;
  }

  set noteSemestre(value: NoteEtudiantSemestre) {
    this.noteEtudiantSemestreService.noteSemestre = value;
  }
  get filierSelct(): string {
    return this.noteEtudiantSemestreService.filierSelct;
  }

  set filierSelct(value: string) {
    this.noteEtudiantSemestreService.filierSelct = value;
  }
  get filieres(): Array<Filiere> {
    return this.noteEtudiantSemestreService.filieres;
  }

  set filieres(value: Array<Filiere>) {
    this.noteEtudiantSemestreService.filieres = value;
  }

  constructor(private noteEtudiantSemestreService:NoteEtudiantSemestreService) {
    this.years=[
      {label: "Annee universitaire:", value: null},
      {label: 2020, value: 2020},
      {label:2021, value:2021},
      {label: 2022, value: 2022},
      {label: 2023, value: 2023},
      {label:2024, value: 2024}
    ];
    this.semestres=[
      {label: "Semestre :", value: null},
      {label: "Semestre 1", value: 1},
      {label: "Semestre 2", value: 2},
      {label: "Semestre 3",value: 3},
      {label: "Semestre 4",value: 4},
      {label: "Semestre 5", value: 5},
      {label: "Semestre 6", value: 6}
    ];
  }

  ngOnInit(): void {
    this.noteEtudiantSemestreService.findAllFiliere();
  }
  get myOptions(): Array<MyOption> {
    return this.noteEtudiantSemestreService.myOptions;
  }
  get myNotesSemestre(): Array<NoteEtudiantSemestre> {
    return this.noteEtudiantSemestreService.myNotesSemestre;
  }

  change1() {
    this.filierSelct=this.fil;
    this.noteEtudiantSemestreService.chercheOptions();
  }

  serachEtudiant(input1: string, input2: number, input3: string) {
    this.noteEtudiantSemestreService.serachEtudiant(input1, input2, input3);
  }

  /*detailSemestre(noteSemestres: NoteEtudiantSemestre) {
    this.noteEtudiantSemestreService.detailSemestre(noteSemestres);

  }*/
  public openCreate(noteSemestres:NoteEtudiantSemestre) {
    this.noteSemestre =noteSemestres;
    this.createDialog = true;
    this.noteEtudiantSemestreService.detailSemestre(noteSemestres);
    this.submitted = false;
  }
  get createDialog(): boolean {
    return this.noteEtudiantSemestreService.createDialog;
  }

  set createDialog(value: boolean) {
    this.noteEtudiantSemestreService.createDialog = value;
  }

  get editDialog(): boolean {
    return this.noteEtudiantSemestreService.editDialog;
  }

  set editDialog(value: boolean) {
    this.noteEtudiantSemestreService.editDialog = value;
  }

  get viewDialog(): boolean {
    return this.noteEtudiantSemestreService.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.noteEtudiantSemestreService.viewDialog = value;
  }

  get submitted(): boolean {
    return this.noteEtudiantSemestreService.submitted;
  }

  set submitted(value: boolean) {
    this.noteEtudiantSemestreService.submitted = value;
  }
}

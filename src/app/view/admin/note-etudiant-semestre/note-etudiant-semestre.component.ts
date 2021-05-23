import { Component, OnInit } from '@angular/core';
import {NoteEtudiantSemestreService} from "../../../controller/service/note-etudiant-semestre.service";
import {MyOption} from "../../../controller/model/my-option.model";
import {NoteEtudiantSemestre} from "../../../controller/model/note-etudiant-semestre.model";

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

  get optionSelct(): string {
    return this.noteEtudiantSemestreService.optionSelct;
  }

  set optionSelct(value: string) {
    this.noteEtudiantSemestreService.optionSelct = value;
  }

  get anneeSelect(): number {
    return this.noteEtudiantSemestreService.anneeSelect;
  }

  set anneeSelect(value: number) {
    this.noteEtudiantSemestreService.anneeSelect = value;
  }

  get semestreSelect() {
    return this.noteEtudiantSemestreService.semestreSelect;
  }

  set semestreSelect(value) {
    this.noteEtudiantSemestreService.semestreSelect = value;
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
    this.noteEtudiantSemestreService.findAllOption();
  }
  get myOptions(): Array<MyOption> {
    return this.noteEtudiantSemestreService.myOptions;
  }
  get myNotesSemestre(): Array<NoteEtudiantSemestre> {
    return this.noteEtudiantSemestreService.myNotesSemestre;
  }

  change1() {
      this.optionSelct=this.input1;
  }

  change2() {
  }

  change3() {
  }

  serachEtudiant(input2: number, input1: string, input3: string) {
    this.noteEtudiantSemestreService.serachEtudiant(input2, input1, input3);
  }
}

import { Component, OnInit } from '@angular/core';
import {NoteEtudiantSemestreService} from "../../controller/service/note-etudiant-semestre.service";
import {NoteEtudiantModule} from "../../controller/model/note-etudiant-module.model";
import {Etudiant} from "../../controller/model/etudiant.model";

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.scss']
})
export class EtudiantComponent implements OnInit {
  semestres:any[];
  input1;
  input2;


  constructor(private noteEtudiantSemestreService:NoteEtudiantSemestreService) {
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
  }
  get semestreSelct(): number {
    return this.noteEtudiantSemestreService.semestreSelct;
  }

  set semestreSelct(value: number) {
    this.noteEtudiantSemestreService.semestreSelct = value;
  }
  get etudiant(): Etudiant {
    return this.noteEtudiantSemestreService.etudiant;
  }
  get notesEtudiantModules(): Array<NoteEtudiantModule> {
    return this.noteEtudiantSemestreService.notesEtudiantModules;
  }
  get submitted(): boolean {
    return this.noteEtudiantSemestreService.submitted;
  }

  set submitted(value: boolean) {
    this.noteEtudiantSemestreService.submitted = value;
  }

  set notesEtudiantModules(value: Array<NoteEtudiantModule>) {
    this.noteEtudiantSemestreService.notesEtudiantModules = value;
  }
  get notesEtudiantModules1(): Array<NoteEtudiantModule> {
    return this.noteEtudiantSemestreService.notesEtudiantModules1;
  }

  set notesEtudiantModules1(value: Array<NoteEtudiantModule>) {
    this.noteEtudiantSemestreService.notesEtudiantModules1 = value;
  }
  get notesEtudiantModules2(): Array<NoteEtudiantModule> {
    return this.noteEtudiantSemestreService.notesEtudiantModules2;
  }

  set notesEtudiantModules2(value: Array<NoteEtudiantModule>) {
    this.noteEtudiantSemestreService.notesEtudiantModules2 = value;
  }


  change2() {
    this.semestreSelct=this.input2;
  }

  afficherPV(input1:string, input2:number) {
    this.noteEtudiantSemestreService.afficherPV(input1,input2);

  }
}

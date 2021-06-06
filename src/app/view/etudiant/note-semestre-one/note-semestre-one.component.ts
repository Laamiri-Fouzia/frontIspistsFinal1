import { Component, OnInit } from '@angular/core';
import {NoteEtudiantModule} from "../../../controller/model/note-etudiant-module.model";
import {NoteEtudiantSemestreService} from "../../../controller/service/note-etudiant-semestre.service";

@Component({
  selector: 'app-note-semestre-one',
  templateUrl: './note-semestre-one.component.html',
  styleUrls: ['./note-semestre-one.component.scss']
})
export class NoteSemestreOneComponent implements OnInit {

  constructor(private noteEtudiantSemestreService:NoteEtudiantSemestreService) { }

  ngOnInit(): void {
  }
  get semestreSelct(): number {
    return this.noteEtudiantSemestreService.semestreSelct;
  }

  set semestreSelct(value: number) {
    this.noteEtudiantSemestreService.semestreSelct = value;
  }
  get notesEtudiantModules(): Array<NoteEtudiantModule> {
    return this.noteEtudiantSemestreService.notesEtudiantModules;
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

    openPDF() {

    }
}

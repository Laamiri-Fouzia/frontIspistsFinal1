import { Component, OnInit } from '@angular/core';
import {NoteEtudiantSemestreService} from "../../../../controller/service/note-etudiant-semestre.service";
import {NoteEtudiantModule} from "../../../../controller/model/note-etudiant-module.model";

@Component({
  selector: 'app-note-etudiant-semestre-modules',
  templateUrl: './note-etudiant-semestre-modules.component.html',
  styleUrls: ['./note-etudiant-semestre-modules.component.scss']
})
export class NoteEtudiantSemestreModulesComponent implements OnInit {

  constructor(private noteEtudiantSemestreService:NoteEtudiantSemestreService) { }

  ngOnInit(): void {
  }
  get createDialog(): boolean {
    return this.noteEtudiantSemestreService.createDialog;
  }

  set createDialog(value: boolean) {
    this.noteEtudiantSemestreService.createDialog = value;
  }
  get notesEtudiantModules(): Array<NoteEtudiantModule> {
    return this.noteEtudiantSemestreService.notesEtudiantModules;
  }

  set notesEtudiantModules(value: Array<NoteEtudiantModule>) {
    this.noteEtudiantSemestreService.notesEtudiantModules = value;
  }

}

import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {NoteEtudiantModule} from "../../../../../controller/model/note-etudiant-module.model";
import {NoteEtudiantStageService} from "../../../../../controller/service/note-etudiant-stage.service";
import {NoteEtudiantStage} from "../../../../../controller/model/note-etudiant-stage.model";

@Component({
  selector: 'app-note-stage-edit',
  templateUrl: './note-stage-edit.component.html',
  styleUrls: ['./note-stage-edit.component.scss']
})
export class NoteStageEditComponent implements OnInit {

  constructor(private noteEtudiantStageService:NoteEtudiantStageService,private messageService: MessageService) { }

  ngOnInit(): void {
  }

  get editDialog(): boolean {
    return this.noteEtudiantStageService.editDialog;
  }
  set editDialog(value: boolean) {
    this.noteEtudiantStageService.editDialog = value;
  }
  get noteEtudiantStage(): NoteEtudiantStage {
    return this.noteEtudiantStageService.noteEtudiantStage;
  }

  set noteEtudiantStage(value: NoteEtudiantStage) {
    this.noteEtudiantStageService.noteEtudiantStage = value;
  }
  get notesEtudiantStage(): Array<NoteEtudiantStage> {
    return this.noteEtudiantStageService.notesEtudiantStage;
  }

  set notesEtudiantStage(value: Array<NoteEtudiantStage>) {
    this.noteEtudiantStageService.notesEtudiantStage = value;
  }

  public findIndexById(cne: String): number {
    let index = -1;
    for (let i = 0; i < this.notesEtudiantStage.length; i++) {
      if (this.notesEtudiantStage[i].etudiant.cne === cne) {
        index = i;
        break;
      }
    }
    return index;
  }

  EditNote() {
    if(this.noteEtudiantStage.noteStage<0 || this.noteEtudiantStage.noteStage>20)
    {
      this.messageService.add({
        severity: 'error',
        summary: 'Error !',
        detail: 'Opération echouée: entrer une note entre 0 et 20  !'
      });

    }else{
      if (this.noteEtudiantStage.etudiant.cne) {
        this.notesEtudiantStage[this.findIndexById(this.noteEtudiantStage.etudiant.cne)] = this.noteEtudiantStage;
      }
      this.noteEtudiantStageService.EditNoteStage();

      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'la modification est effectuée ',
        life: 3000
      });
    }
    this.hideEditDialog();
  }
  public hideEditDialog() {
    this.noteEtudiantStageService.editDialog = false;
  }

}

import { Component, OnInit } from '@angular/core';
import {NoteEtudiantModuleService} from "../../../../controller/service/note-etudiant-module.service";
import {NoteEtudiantModule} from "../../../../controller/model/note-etudiant-module.model";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-note-etudiant-module-edit',
  templateUrl: './note-etudiant-module-edit.component.html',
  styleUrls: ['./note-etudiant-module-edit.component.scss']
})
export class NoteEtudiantModuleEditComponent implements OnInit {

  constructor(private noteEtudiantModuleService:NoteEtudiantModuleService,private messageService: MessageService) { }

  ngOnInit(): void {
  }
  get editDialog(): boolean {
    return this.noteEtudiantModuleService.editDialog;
  }
  get noteEtudiantModule(): NoteEtudiantModule {
    return  this.noteEtudiantModuleService.noteEtudiantModule;
  }
  set editDialog(value: boolean) {
    this.noteEtudiantModuleService.editDialog = value;
  }
  get notesEtudiantModule(): Array<NoteEtudiantModule> {
    return this.noteEtudiantModuleService.notesEtudiantModule;
  }

  public findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.notesEtudiantModule.length; i++) {
      if (this.notesEtudiantModule[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  EditNote() {
    if (this.noteEtudiantModule.id) {
      this.notesEtudiantModule[this.findIndexById(this.noteEtudiantModule.id)] = this.noteEtudiantModule;
    }
    this.noteEtudiantModuleService.EditNote();
    this.hideEditDialog();
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'la modification est effectuée ',
      life: 3000
    });

  }
  public hideEditDialog() {
    this.editDialog = false;
  }

}

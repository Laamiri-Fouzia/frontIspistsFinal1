import { Injectable } from '@angular/core';
import {NoteEtudiantModule} from "../model/note-etudiant-module.model";
import {NoteEtudiantStage} from "../model/note-etudiant-stage.model";
import {newArray} from "@angular/compiler/src/util";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NoteEtudiantStageService {
    private _noteEtudiantStage:NoteEtudiantStage;
    private _notesEtudiantStage:Array<NoteEtudiantStage>;
    private urlBase = 'http://localhost:8036/';
    private URLNoteEtudStage = 'ispits-project/note-etudiant-stage';
    private _editDialog:boolean;
    constructor(private http:HttpClient) { }

    get noteEtudiantStage(): NoteEtudiantStage {
        if(this._noteEtudiantStage==null)
            this._noteEtudiantStage=new NoteEtudiantStage();
        return this._noteEtudiantStage;
    }

    set noteEtudiantStage(value: NoteEtudiantStage) {
        this._noteEtudiantStage = value;
    }

    get notesEtudiantStage(): Array<NoteEtudiantStage> {
        if(this._notesEtudiantStage==null)
            this._notesEtudiantStage=new Array<NoteEtudiantStage>();
        return this._notesEtudiantStage;
    }

    set notesEtudiantStage(value: Array<NoteEtudiantStage>) {
        this._notesEtudiantStage = value;
    }

  serachEtudiantStage(mod:string) {
    //this._moduleselected=mod;
    this.http.get<Array<NoteEtudiantStage>>(this.urlBase + this.URLNoteEtudStage+'/module-semestre-option/codeModule/'+mod).subscribe(
        data => {
          this._notesEtudiantStage=data;
        }, error => {
          console.log(error);
        }
    );
  }
    EditNoteStage() {
        if (this.noteEtudiantStage.noteStage < 10)
            this.noteEtudiantStage.etatValidation.libelle = 'Non Validé';
        else
            this.noteEtudiantStage.etatValidation.libelle = 'Validé';
        console.log(this.noteEtudiantStage)
        this.http.put(this.urlBase+this.URLNoteEtudStage+'/updateStage/',this.noteEtudiantStage).subscribe(
            data => {

            }, error => {
                console.log(error);
            }
        );
    }

    get editDialog(): boolean {
        return this._editDialog;
    }

    set editDialog(value: boolean) {
        this._editDialog = value;
    }


}

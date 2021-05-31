import { Injectable } from '@angular/core';
import {ModuleSemestreOption} from "../model/module-semestre-option.model";
import {NoteEtudiantModule} from "../model/note-etudiant-module.model";
import {HttpClient} from "@angular/common/http";
import {ModuleSemestreOptionService} from "./module-semestre-option.service";
import {THIS_EXPR} from "@angular/compiler/src/output/output_ast";

@Injectable({
  providedIn: 'root'
})
export class NoteEtudiantModuleService {
  private urlBase='http://localhost:8036/';
    private _editDialog: boolean;
    private _noteEtudiantModule:NoteEtudiantModule;
  private _notesEtudiantModule:Array<NoteEtudiantModule>;
  private _notesEtudiantRat:Array<NoteEtudiantModule>;
  private URLNoteEtudModule: string='ispits-project/note-etudiant-modul';

  constructor(private http:HttpClient) { }

  serachEtudiant(module:string) {
      alert(this.urlBase + this.URLNoteEtudModule+'/module-semestre-option/codeModule/'+module)
      this.http.get<Array<NoteEtudiantModule>>(this.urlBase + this.URLNoteEtudModule+'/module-semestre-option/codeModule/'+module).subscribe(
      data => {
        this.notesEtudiantModule = data;
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
  get noteEtudiantModule(): NoteEtudiantModule {
    if(this._noteEtudiantModule==null)
      this._noteEtudiantModule=new NoteEtudiantModule();
    return this._noteEtudiantModule;
  }

  set noteEtudiantModule(value: NoteEtudiantModule) {
    this._noteEtudiantModule = value;
  }

  get notesEtudiantModule(): Array<NoteEtudiantModule> {
    if(this._notesEtudiantModule==null)
      this._notesEtudiantModule=new Array<NoteEtudiantModule>();
    return this._notesEtudiantModule;
  }

  set notesEtudiantModule(value: Array<NoteEtudiantModule>) {
    this._notesEtudiantModule = value;
  }

  get notesEtudiantRat(): Array<NoteEtudiantModule> {
    if(this._notesEtudiantRat==null)
      this._notesEtudiantRat=new Array<NoteEtudiantModule>();
    return this._notesEtudiantRat;
  }

  set notesEtudiantRat(value: Array<NoteEtudiantModule>) {
    this._notesEtudiantRat = value;
  }

  EditNote() {
     let pc=0.75;
     let pf=0.25;
     let nc=this.noteEtudiantModule.noteContinue;
     let nfAvR=this.noteEtudiantModule.noteFinalAvRat;
     this.noteEtudiantModule.noteModuleNormal=(pc*nc)+(pf*nfAvR);
     this.noteEtudiantModule.noteGlobale=this.noteEtudiantModule.noteModuleNormal;
     if(this.noteEtudiantModule.noteModuleNormal>=10)
       this.noteEtudiantModule.etatValidation.libelle='Validé';
     else
       this.noteEtudiantModule.etatValidation.libelle='Rattrapage';
     console.log(this.noteEtudiantModule);
     this.http.put(this.urlBase+this.URLNoteEtudModule+'/',this.noteEtudiantModule).subscribe(
       data => {
            console.log(data)
       }, error => {
         console.log(error);
       }
     );

  }

    listeRatt(module: string){
        this.http.get<Array<NoteEtudiantModule>>(this.urlBase + this.URLNoteEtudModule+'/moduleSemestreOption/codeModule/'+module+'/etatValidation/codeEtat/R').subscribe(
            data => {
                console.log(data)
                this.notesEtudiantRat = data;
                console.log(this.notesEtudiantRat)
            }, error => {
                console.log(error);
            }
        );
  }


  EditNoteRat() {
    let pc=0.75;
    let pf=0.25;
    let nc=this.noteEtudiantModule.noteContinue;
    let nfApresR=this.noteEtudiantModule.noteFinalApresRat;
    this.noteEtudiantModule.noteModuleRat=(pc*nc)+(pf*nfApresR);

    if(this.noteEtudiantModule.noteModuleRat>this.noteEtudiantModule.noteModuleNormal)
        this.noteEtudiantModule.noteGlobale=this.noteEtudiantModule.noteModuleRat;

    if(this.noteEtudiantModule.noteGlobale<10)
      this.noteEtudiantModule.etatValidation.libelle='Non Validé';
    else
      this.noteEtudiantModule.etatValidation.libelle='V aprés Rattrapage';

    console.log(this.noteEtudiantModule);
    this.http.put(this.urlBase+this.URLNoteEtudModule+'/',this.noteEtudiantModule).subscribe(
      data => {
        console.log(data)
      }, error => {
        console.log(error);
      }
    );
  }
}

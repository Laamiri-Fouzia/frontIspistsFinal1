import { Injectable } from '@angular/core';
import {ModuleSemestreOption} from "../model/module-semestre-option.model";
import {NoteEtudiantModule} from "../model/note-etudiant-module.model";
import {HttpClient} from "@angular/common/http";
import {ModuleSemestreOptionService} from "./module-semestre-option.service";
import {THIS_EXPR} from "@angular/compiler/src/output/output_ast";
import {Absence} from "../model/absence.model";
import {Etudiant} from "../model/etudiant.model";
import {environment} from "../../../environments/environment";
import * as XLSX from "xlsx";
import {MyOption} from "../model/my-option.model";

@Injectable({
  providedIn: 'root'
})
export class NoteEtudiantModuleService {
    get moduleselected(): string {
        return this._moduleselected;
    }
  private urlBase='http://localhost:8036/';
    private URLNoteEtudModule: string='ispits-project/note-etudiant-modul';
  private _urlAbsence=environment.baseUrl+'absence/';
  private _editDialog: boolean;
  private _noteEtudiantModule:NoteEtudiantModule;
  private _notesEtudiantModule:Array<NoteEtudiantModule>;
  private _etudiantAbsente:Array<Etudiant>;
  private _notesEtudiantRat:Array<NoteEtudiantModule>;

    private moduleselsected: string;
    private _moduleselected: string;
    private _moduleRatt: string;


    constructor(private http:HttpClient) { }

    get etudiantAbsente(): Array<Etudiant> {
      if(this._etudiantAbsente==null)
          this._etudiantAbsente=new Array<Etudiant>();
        return this._etudiantAbsente;
    }

    set etudiantAbsente(value: Array<Etudiant>) {
        this._etudiantAbsente = value;
    }


    private filterEtudiant(data: Array<NoteEtudiantModule>) {

           for(let noteEtudiantModule of data){

               this.http.get<Array<Absence>>(this._urlAbsence+'/etudiant/cne/'+noteEtudiantModule.etudiant.cne+'/seance/moduleSemestreOption/code/'+this.moduleselsected).subscribe(
                   data => {
                       if(data.length<3)
                           this.notesEtudiantModule.push(noteEtudiantModule);
                       else
                           this.etudiantAbsente.push(noteEtudiantModule.etudiant);
                   }, error => {
                       console.log(error);
                   }
               );

           }
    }
  serachEtudiant(module:string) {
        this.notesEtudiantModule=new Array<NoteEtudiantModule>();
      this._moduleselected=module;
      this.http.get<Array<NoteEtudiantModule>>(this.urlBase + this.URLNoteEtudModule+'/module-semestre-option/codeModule/'+module).subscribe(
      data => {
           this.filterEtudiant(data);
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
      this.noteEtudiantModule.moduleSemestreOption.code=this._moduleselected;
     if(this.noteEtudiantModule.noteModuleNormal>=10)
       this.noteEtudiantModule.etatValidation.libelle='Validé';
     else
       this.noteEtudiantModule.etatValidation.libelle='Rattrapage';
     this.http.put(this.urlBase+this.URLNoteEtudModule+'/updatenormal/',this.noteEtudiantModule).subscribe(
       data => {
            console.log(data)
       }, error => {
         console.log(error);
       }
     );

  }

  EditNoteForExcel() {
     this.http.put(this.urlBase+this.URLNoteEtudModule+'/updatenormal/',this.noteEtudiantModule).subscribe(
       data => {
            console.log(data)
       }, error => {
         console.log(error);
       }
     );

  }

    listeRatt(module: string){
        this._moduleRatt=module;
        this.http.get<Array<NoteEtudiantModule>>(this.urlBase + this.URLNoteEtudModule+'/moduleSemestreOption/codeModule/'+module+'/etatValidation/codeEtat/R').subscribe(
            data => {

                this.notesEtudiantRat = data;
                console.log(this.notesEtudiantRat)
            }, error => {
                console.log(error);
            }
        );
  }

  EditNoteRat() {
    this.http.put(this.urlBase+this.URLNoteEtudModule+'/updateratt/',this.noteEtudiantModule).subscribe(
      data => {

      }, error => {
        console.log(error);
      }
    );
  }

    public importFromFile(bstr: string): XLSX.AOA2SheetOpts {
        // bax i9rah
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        // 3la l first sheet
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /*save data en va le supprimer apres*/
        const data = <XLSX.AOA2SheetOpts>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
        return data;
    }

    get moduleRatt(): string {
        return this._moduleRatt;
    }

    set moduleRatt(value: string) {
        this._moduleRatt = value;
    }



}

import { Injectable } from '@angular/core';
import {MyOption} from "../model/my-option.model";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {NoteEtudiantSemestre} from "../model/note-etudiant-semestre.model";
import {Filiere} from "../model/filiere.model";
import {NoteEtudiantModule} from "../model/note-etudiant-module.model";

@Injectable({
  providedIn: 'root'
})
export class NoteEtudiantSemestreService {
  constructor(private http:HttpClient,private messageService: MessageService) { }
  private _myOptions:Array<MyOption>;
  private _myNotesSemestre:Array<NoteEtudiantSemestre>;
  private _urlOption='ispits-project/option';
  private _urlNoteEtudiantSemestre='ispits-project/note-etudiant-semestre';
  private _urlBase='http://localhost:8036/';
  private _urlFiliere='ispits-project/filliere';
  private _urlNoteEtudModule: string='ispits-project/note-etudiant-modul';
  private _filierSelct:string;
  private _filieres:Array<Filiere>;
  private _createDialog: boolean;
  private _editDialog: boolean;
  private _viewDialog: boolean;
  private _submitted: boolean;
  private _noteSemestre:NoteEtudiantSemestre;
  private _notesEtudiantModules:Array<NoteEtudiantModule>;


  get notesEtudiantModules(): Array<NoteEtudiantModule> {
      if(this._notesEtudiantModules==null){
          this._notesEtudiantModules=new Array<NoteEtudiantModule>();
      }
        return this._notesEtudiantModules;
    }

    set notesEtudiantModules(value: Array<NoteEtudiantModule>) {
        this._notesEtudiantModules = value;
    }

    get noteSemestre(): NoteEtudiantSemestre {
        if(this._noteSemestre==null){
            this._noteSemestre=new NoteEtudiantSemestre();
        }
        return this._noteSemestre;
    }

    set noteSemestre(value: NoteEtudiantSemestre) {
        this._noteSemestre = value;
    }

    get createDialog(): boolean {
        return this._createDialog;
    }

    set createDialog(value: boolean) {
        this._createDialog = value;
    }

    get editDialog(): boolean {
        return this._editDialog;
    }

    set editDialog(value: boolean) {
        this._editDialog = value;
    }

    get viewDialog(): boolean {
        return this._viewDialog;
    }

    set viewDialog(value: boolean) {
        this._viewDialog = value;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }


  get filieres(): Array<Filiere> {
        if(this._filieres==null){
            this._filieres=new Array<Filiere>();
        }
    return this._filieres;
  }

  set filieres(value: Array<Filiere>) {
    this._filieres = value;
  }

  get filierSelct(): string {
    return this._filierSelct;
  }

  set filierSelct(value: string) {
    this._filierSelct = value;
  }

  get myNotesSemestre(): Array<NoteEtudiantSemestre> {
    if(this._myNotesSemestre==null){
      this._myNotesSemestre=new Array<NoteEtudiantSemestre>();
    }
    return this._myNotesSemestre;
  }

  set myNotesSemestre(value: Array<NoteEtudiantSemestre>) {
    this._myNotesSemestre = value;
  }
  get myOptions(): Array<MyOption> {
    if(this._myOptions==null){
      this._myOptions=new Array<MyOption>();
    }
    return this._myOptions;
  }

  set myOptions(value: Array<MyOption>) {
    this._myOptions = value;
  }
    chercheOptions(){
        this.http.get<Array<MyOption>>(this._urlBase+this._urlOption+'/filiere/code/'+this.filierSelct).subscribe(
            data=>{
                console.log(data);
                this.myOptions=data;
            },error => {
                alert('ha fin dkhalet');
            }
        );


    }
  /*findAllOption() {
    this.http.get<Array<MyOption>>(this._urlBase+this._urlOption +'/').subscribe(
        data => {
          console.log(data);
          this.myOptions=data;
        },error => {
          console.log(error);
        });
  }*/


  serachEtudiant(input1: string,input2: number, input3: string) {
    this.http.get<Array<NoteEtudiantSemestre>>(this._urlBase+this._urlNoteEtudiantSemestre+'/semestre/codeSemestre/'+input3+'/option/codeOption/'+input1+'/annee/'+input2).subscribe(
        data=>{
          console.log(data);
          this.myNotesSemestre=data;
        },error=>{
          alert('error');
        }
    );
  }
  findAllFiliere() {
    this.http.get<Array<Filiere>>(this._urlBase+this._urlFiliere+'/').subscribe(
        data=>{
          console.log(data+'sana');
          this.filieres=data;
        },error=>{
          alert('ha fin dkhalet');
        }
    );
  }

    detailSemestre(noteSemestres: NoteEtudiantSemestre) {
        this.http.get<Array<NoteEtudiantModule>>(this._urlBase+this._urlNoteEtudModule+'/Etudiant/cne/'+noteSemestres.etudiant.cne).subscribe(
            data=>{
                this.notesEtudiantModules=data;
                console.log(data);
            },error => {
                alert('error')
            }
        );
    }
}

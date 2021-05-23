import { Injectable } from '@angular/core';
import {MyOption} from "../model/my-option.model";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {NoteEtudiantSemestre} from "../model/note-etudiant-semestre.model";
import {newArray} from "@angular/compiler/src/util";

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
  private _optionSelct:string;
  private _anneeSelect:number;
  private _semestreSelect;


  get optionSelct(): string {
    return this._optionSelct;
  }

  set optionSelct(value: string) {
    this._optionSelct = value;
  }

  get anneeSelect(): number {
    return this._anneeSelect;
  }

  set anneeSelect(value: number) {
    this._anneeSelect = value;
  }

  get semestreSelect() {
    return this._semestreSelect;
  }

  set semestreSelect(value) {
    this._semestreSelect = value;
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

  findAllOption() {
    this.http.get<Array<MyOption>>(this._urlBase+this._urlOption +'/').subscribe(
        data => {
          console.log(data);
          this.myOptions=data;
        },error => {
          console.log(error);
        });
  }

  serachEtudiant(input2: number,input1: string, input3: string) {
    this.http.get<Array<NoteEtudiantSemestre>>(this._urlBase+this._urlNoteEtudiantSemestre+'/semestre/codeSemestre/'+input2+'/option/codeOption/'+input1+'/annee/'+input3).subscribe(
        data=>{
          console.log(data);
          alert('ya gelbi w chaf dwak che mkhabi')
          this.myNotesSemestre=data;
        },error=>{
          alert('ya samra hobk walali jamra ya yema 3la 3eshk lhadra');
        }
    );
  }
}

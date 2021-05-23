import { Injectable } from '@angular/core';


import {Filiere} from "../model/filiere.model";
import {HttpClient} from "@angular/common/http";
import {MyOption} from "../model/my-option.model";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class PonderationService {
  constructor(private http:HttpClient,private messageService: MessageService) { }

  private _myOptions:Array<MyOption>;
  private _filieres:Array<Filiere>;
  private _filSelected:string;
  private _filiere:Filiere;
  private _urlBase='http://localhost:8036/';
  private _urlOption='ispits-project/option';
  private _urlFiliere='ispits-project/filliere';
  private _myOption:MyOption;
  private _createDialog: boolean;
  private _editDialog: boolean;
  private _viewDialog: boolean;
  private _submitted: boolean;
  get editDialog(): boolean {
    return this._editDialog;
  }
  set editDialog(value: boolean) {
    this._editDialog = value;
  }

  get submitted(): boolean {
    return this._submitted;
  }
  set submitted(value: boolean) {
    this._submitted = value;
  }

  get viewDialog(): boolean {
    return this._viewDialog;
  }
  set viewDialog(value: boolean) {
    this._viewDialog = value;
  }

  get createDialog(): boolean {
    return this._createDialog;
  }
  set createDialog(value: boolean) {
    this._createDialog = value;
  }


  get filiere(): Filiere {
    if(this._filiere==null){
      this._filiere=new Filiere();
    }
    return this._filiere;
  }

  set filiere(value: Filiere) {
    this._filiere = value;
  }

  get myOption(): MyOption {
    if(this._myOption==null){
      this._myOption=new MyOption();
    }
    return this._myOption;
  }

  set myOption(value: MyOption) {
    this._myOption = value;
  }

  get filSelected(): string {
    return this._filSelected;
  }

  set filSelected(value: string) {
    this._filSelected = value;
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

  get filieres(): Array<Filiere> {
    if(this._filieres==null){
      this._filieres=new Array<Filiere>();
    }
    return this._filieres;
  }

  set filieres(value: Array<Filiere>) {
    this._filieres = value;
  }
  public remplirFiliere(){
    this.http.get<Filiere>(this._urlBase+this._urlFiliere+'/code/'+this.filSelected).subscribe(
        data=>{
          this.filiere=data;
        }
    );
  }
  chercheOptions(){
    this.http.get<Array<MyOption>>(this._urlBase+this._urlOption+'/filiere/code/'+this.filSelected).subscribe(
        data=>{
         console.log(data);
          this.myOptions=data;
        },error => {
          alert('ha fin dkhalet');
        }
    );


  }

  savePonderation(input1: number, input2: number) {
    console.log(input1);
    console.log(input2);
    console.log(this.myOption);
    this.myOption.coefContinue=input1;
    this.myOption.coefFinale=input2;
    console.log(this.filiere);
    console.log(this._urlBase+this._urlOption+'/');
    this.http.put(this._urlBase+this._urlOption+'/',this.myOption).subscribe(
        data=>{
          this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'la modification est effectuée ',
          life: 3000
        });
        },
        error=>{
          alert('sana lam tossajal');
        }
    );
this.createDialog=false;
this.myOption=null;
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
}


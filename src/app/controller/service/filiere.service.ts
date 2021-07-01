import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Filiere} from "../model/filiere.model";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {MyOption} from "../model/my-option.model";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class FiliereService {

  constructor(private http: HttpClient,private messageService: MessageService) { }
  private _filiere: Filiere;//selected
  private _filieres: Array<Filiere>;//items
  private _createDialog: boolean;
  private _editDialog: boolean;
  private _viewDialog: boolean;
  private _submitted: boolean;

  private _createDialog1: boolean;
  private _editDialog1: boolean;
  private _viewDialog1: boolean;
  private _submitted1: boolean;

  private _labelOption:string;

  private urlFiliere = environment.baseUrl + 'filliere/';

  get filiere(): Filiere {
    if(this._filiere==null){
      this._filiere= new Filiere();
    }
    return this._filiere;
  }
  set filiere(value: Filiere) {
    this._filiere = value;
  }
  get filieres(): Array<Filiere> {
    if (this._filieres==null){
      this._filieres=new Array<Filiere>();
    }
    return this._filieres;
  }
  set filieres(value: Array<Filiere>) {
    this._filieres = value;
  }

  public findAll(): Observable<Array<Filiere>> {
    return this.http.get<Array<Filiere>>(this.urlFiliere);
  }
  public save(): Observable<number> {
    return this.http.post<number>(this.urlFiliere, this.filiere);
  }
  public edit(): Observable<Filiere> {
    return this.http.put<Filiere>(this.urlFiliere, this.filiere);
  }
  public deleteByCode(): Observable<number> {
    return this.http.delete<number>(this.urlFiliere + 'code/' + this.filiere.code);
  }

  public deleteOptionByCode(): Observable<number> {
    alert(this.myOption.code);
    alert(this.urlOption + '/code/' + this.myOption.code);
    return this.http.delete<number>(this.urlOption + '/code/' + this.myOption.code);
  }


  private urlOption=environment.baseUrl+'option';
  private _filiere2: Filiere;
  private _myOption: MyOption;
  private _myOptions: Array<MyOption>;


  get filiere2(): Filiere {
    if(this._filiere2==null){
      this._filiere2= new Filiere();
    }
    return this._filiere2;
  }
  set filiere2(value: Filiere) {
    this._filiere2 = value;
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
  get myOptions(): Array<MyOption> {
    if(this._myOptions==null)
      this._myOptions=new Array<MyOption>();
    return this._myOptions;
  }
  set myOptions(value: Array<MyOption>) {
    this._myOptions = value;
  }


  get editDialog1(): boolean {
    return this._editDialog1;
  }
  set editDialog1(value: boolean) {
    this._editDialog1 = value;
  }

  get submitted1(): boolean {
    return this._submitted1;
  }
  set submitted1(value: boolean) {
    this._submitted1 = value;
  }

  get viewDialog1(): boolean {
    return this._viewDialog1;
  }
  set viewDialog1(value: boolean) {
    this._viewDialog1 = value;
  }

  get createDialog1(): boolean {
    return this._createDialog1;
  }
  set createDialog1(value: boolean) {
    this._createDialog1 = value;
  }



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

  detailFiliere(f:Filiere) {
    //this._displayOptions=true;
    this.http.get<Array<MyOption>>( this.urlOption +'/filiere/code/'+f.code).subscribe(
        data => {
          this.filiere2=f;
          this.myOptions=data;
        },error => {
          console.log(error);
        });
  }
  getAllOptions(){
    this.http.get<Array<MyOption>>(this.urlOption +'/').subscribe(
        data => {
          this.myOptions=data;
        },error => {
          console.log(error);
        });
  }

  /*saveOption(input1:string,input2:string) {
    this.myOption.code=input1;
    this.myOption.libelle=input2;
    this.myOption.filliere=this.filiere2;
    this.http.post<number>(this.urlOption +'/',this.myOption ).subscribe(
        data=>{
          this.myOptions.push(this.cloneOption(this.myOption));
          this.myOption=null;

        },error => {
          console.log(error);
        }
    );
  }*/

  public saveOption(input1:string,input2:string) {
    this.submitted1 = true;
    this.myOption.code=input1;
    this.myOption.libelle=input2;
    this.myOption.filliere=this.filiere2;
    if (this.myOption.code.trim()) {
      this.http.post(this.urlOption +'/',this.myOption ).subscribe(
          data=> {
            if(data==1){
               this.myOptions.push(this.cloneOption(this.myOption));
               this.messageService.add({
                 severity: 'success',
                 summary: 'Successful',
                 detail: 'Option Bien est crée!',
                 life: 3000
               });
             }else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error !',
                detail: 'Attention :une option avec le code : '+this.myOption.code+' est deja existe !'
              });
            }
          }
         );

      this.createDialog = false;
      this.filiere = new Filiere();
    }
  }


  public cloneOption(opt: MyOption) {
    let nvOption : MyOption = new MyOption();
    nvOption.libelle=opt.libelle;
    nvOption.code=opt.code;
    nvOption.filliere=opt.filliere;
    return nvOption;
  }

  public deleteOption(): Observable<number> {
    return this.http.delete<number>(this.urlOption + 'code/' + this.myOption.code);
  }

  get labelOption(): string {
    return this._labelOption;
  }

  set labelOption(value: string) {
    this._labelOption = value;
  }



}
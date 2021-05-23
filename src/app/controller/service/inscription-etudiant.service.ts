import { Injectable } from '@angular/core';
import {EtudiantOption} from "../model/etudiant-option.model";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InscriptionEtudiantService {

  private _createDialog: boolean;
  private _editDialog: boolean;
  private _etudiantOption:EtudiantOption;
  private _etudiantOptions:Array<EtudiantOption>;
  private _etudiantAnciens:Array<EtudiantOption>;
  private urlEtudiantOption=environment.baseUrl+'etudiantOption/';
  private urlEtudiant=environment.baseUrl+'Etudiant/';
  constructor(private http:HttpClient) { }




  get etudiantAnciens(): Array<EtudiantOption> {
    if(this._etudiantAnciens==null)
      this._etudiantAnciens=new Array<EtudiantOption>();
    return this._etudiantAnciens;
  }

  set etudiantAnciens(value: Array<EtudiantOption>) {
    this._etudiantAnciens = value;
  }


  get editDialog(): boolean {
    return this._editDialog;
  }
  set editDialog(value: boolean) {
    this._editDialog = value;
  }

  get createDialog(): boolean {
    return this._createDialog;
  }
  set createDialog(value: boolean) {
    this._createDialog = value;
  }

  get etudiantOption(): EtudiantOption {
    if(this._etudiantOption==null){
      this._etudiantOption=new EtudiantOption();
    }
    return this._etudiantOption;
  }

  set etudiantOption(value: EtudiantOption) {
    this._etudiantOption = value;
  }

  get etudiantOptions(): Array<EtudiantOption> {
    if(this._etudiantOptions==null){
      this._etudiantOptions =new Array<EtudiantOption>();
    }
    return this._etudiantOptions;
  }

  set etudiantOptions(value: Array<EtudiantOption>) {
    this._etudiantOptions = value;
  }

  /*public cloneEtudiantOption(etudianOption:EtudiantOption):EtudiantOption{
      let  nvEtudiantOption: EtudiantOption = new EtudiantOption();
      nvEtudiantOption.etudiant=etudianOption.etudiant
      nvEtudiantOption.myOption=etudianOption.myOption
      nvEtudiantOption.annee=etudianOption.annee
      nvEtudiantOption.semestre=etudianOption.semestre
      nvEtudiantOption.id=etudianOption.id
      return nvEtudiantOption;
  }*/

  SearchStudent() {
    let annee=this.etudiantOption.annee;
    let optionCode=this.etudiantOption.myOption.code;
    let semestreCode=this.etudiantOption.semestre.code;
    console.log(annee+optionCode+semestreCode);

    this.http.get<Array<EtudiantOption>>(this.urlEtudiantOption+'AncienEtudiant/option/code/'+optionCode+'/annee/'+annee+'/semestre/codesemes/'+semestreCode).subscribe(
        data => {
          console.log(data)
          this.etudiantOptions = data;
        }, error => {
          console.log(error);
        }
    );
  }


  SearchAncienStudent() {
    let annee=this.etudiantOption.annee;
    let optionCode=this.etudiantOption.myOption.code;
    let semestreCode=this.etudiantOption.semestre.code;
    this.http.get<Array<EtudiantOption>>(this.urlEtudiantOption+'AncienEtudiant/option/code/'+optionCode+'/annee/'+annee+'/semestre/codesemes/'+semestreCode).subscribe(
        data => {
          console.log(data)
          this.etudiantAnciens = data;
        }, error => {
          console.log(error);
        }
    );
  }


  saveNewEtudiant() {
   this.http.post(this.urlEtudiantOption+'newEtudiant/', this.etudiantOption).subscribe(
        data=>{
          console.log(this.etudiantOption);

          alert(data)
          if(data==1){
            this.etudiantOptions.push(this.etudiantOption);
          }
        },error=>{
          console.log(error);
        }
    );
  }


  EditStudent() {
      console.log(this.etudiantOption)
      this.http.put(this.urlEtudiant, this.etudiantOption.etudiant).subscribe(
        data=>{
            this.etudiantOption=null;
        },error=>{
          console.log(error);
        }
    );
  }


    deleteEtudiantOption() {

    }
}

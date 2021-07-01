import { Injectable } from '@angular/core';
import {Seance} from "../model/seance.model";
import {HttpClient} from "@angular/common/http";
import {ModuleSemestreOption} from "../model/module-semestre-option.model";

import {environment} from "../../../environments/environment";
import {MessageService} from "primeng/api";
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class SeanceService {
  private _URLmoduleSemOpt = 'ispits-project/module-semestre-option/';
  private _urlSeance: string=environment.baseUrl+'seance';
  private _urlBase='http://localhost:8036/';
  private _urlS='ispits-project/seance';
  private _createDialog: boolean;
  private _editDialog: boolean;
  private _viewDialog: boolean;
  private _submitted: boolean;
  private _createDialog2: boolean;
  private _editDialog2: boolean;
  private _viewDialog2: boolean;
  private _submitted2: boolean;
  private _moduleSemestreOption: ModuleSemestreOption;
  private _seanceEdit:Seance;
  private _dateSea:Date;

  get dateSea(): Date {
    return this._dateSea;
  }

  set dateSea(value: Date) {
    this._dateSea = value;
  }

  get seanceEdit(): Seance {
    if(this._seanceEdit==null){
      this._seanceEdit=new Seance();
    }
    return this._seanceEdit;
  }

  set seanceEdit(value: Seance) {
    this._seanceEdit = value;
  }

  get createDialog2(): boolean {
    return this._createDialog2;
  }

  set createDialog2(value: boolean) {
    this._createDialog2 = value;
  }

  get editDialog2(): boolean {
    return this._editDialog2;
  }

  set editDialog2(value: boolean) {
    this._editDialog2 = value;
  }

  get viewDialog2(): boolean {
    return this._viewDialog2;
  }

  set viewDialog2(value: boolean) {
    this._viewDialog2 = value;
  }

  get submitted2(): boolean {
    return this._submitted2;
  }

  set submitted2(value: boolean) {
    this._submitted2 = value;
  }

  get moduleSemestreOption(): ModuleSemestreOption {
    return this._moduleSemestreOption;
  }

  set moduleSemestreOption(value: ModuleSemestreOption) {
    this._moduleSemestreOption = value;
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

  constructor(private http:HttpClient,private messageService: MessageService) {

  }
  private _seance:Seance;
  private _seances:Array<Seance>;

  get seance(): Seance {
    if(this._seance==null){
       this._seance=new Seance();
    }
    return this._seance;
  }

  set seance(value: Seance) {
    this._seance = value;
  }

  get seances(): Array<Seance> {
    if(this._seances==null)
      this._seances=new Array<Seance>();
    return this._seances;
  }

  set seances(value: Array<Seance>) {
    this._seances = value;
  }

  serachSeances(codeModule:string){
    this.http.get<Array<Seance>>(this._urlSeance+'/moduleSemestreOption/code/'+codeModule).subscribe(
        data=>{
           this.seances=data;
        },error => {
           console.log(error)
        }
    );
  }


  detailModuleSemestreOption(moduleSemestreOption: ModuleSemestreOption) {
    this.moduleSemestreOption=moduleSemestreOption;
    console.log(this.moduleSemestreOption);
    this.http.get<Array<Seance>>(this._urlSeance+'/moduleSemestreOption/code/'+moduleSemestreOption.code).subscribe(
        data=>{
          this.seances=data;
          console.log(data);
        },error => {
          alert('error');
        }
    );

  }

  cloneSeance(seance:Seance){
    let s=new Seance();
    s.dateSeance=seance.dateSeance;
    s.libelle=seance.libelle;
    s.heureDebut=seance.heureDebut;
    s.heureFin=seance.heureFin;
    s.moduleSemestreOption={...seance.moduleSemestreOption};
    return s;
  }

  saveSeance(input1: string, input2: string, input3: string, input4: Date) {
    this.seance.libelle=input1;
    var d=moment(input4).format('YYYY-MM-DD');
    this.seance.dateSeance=d;
    this.seance.heureDebut=input2;
    this.seance.heureFin=input3;
    this.seance.moduleSemestreOption=this.moduleSemestreOption;

    this.http.post<number>(this._urlBase+this._urlS+'/',this.seance).subscribe(
        data=>{
          if(data==1){
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'la seance bien enregistré! ',
            });
            this.seances.push(this.cloneSeance(this.seance));
          }

          else if(data==-1){
            this.messageService.add({
              severity: 'error',
              summary: 'Error !',
              detail: 'Attention :Seance deja exist',
            });
          }else
            this.messageService.add({
              severity: 'error',
              summary: 'Error !',
              detail: 'Operation echouée :Réssayer une eutre fois !',
            });

        },error => {
          alert('error');
        }
    );
    this.createDialog=false;

  }

    editSeance(seance: Seance) {
    this.seanceEdit=seance;
    this.moduleSemestreOption=seance.moduleSemestreOption;
    this.dateSea=moment(seance.dateSeance).toDate();
  }

  seanceEDIT(date:Date,libelle:string,heureDebut:string,heureFin:string) {
      this.seance.dateSeance=moment(date).format('YYYY-MM-DD');
      this.seance.heureFin=heureFin;
      this.seance.heureDebut=heureDebut;
      this.seance.libelle=libelle;
      this.seance.moduleSemestreOption=this.moduleSemestreOption;
      console.log(this.seance);
      this.dateSea=moment(this.seance.dateSeance).toDate();
    this.http.put(this._urlBase+this._urlS+'/',this.seance).subscribe(
        data=>{
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'la seance bien modifié!',
            });
        },error => {
            this.messageService.add({
                severity: 'error',
                summary: 'Error !',
                detail: 'Operation echouée :Réssayer une eutre fois !',
            });
        }
    );
    this.createDialog2=false;
  }
}

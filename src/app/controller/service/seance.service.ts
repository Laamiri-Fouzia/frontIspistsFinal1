import { Injectable } from '@angular/core';
import {Seance} from "../model/seance.model";
import {ModuleSemestreOption} from "../model/module-semestre-option.model";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {Time} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class SeanceService {
  private _urlBase = 'http://localhost:8036/';//http://localhost:8036/ispits-project/module-semestre-option/
  private _urlSeance = 'ispits-project/seance';
  private _seances:Array<Seance>;
  private _seance:Seance;
  private _createDialog: boolean;
  private _editDialog: boolean;
  private _viewDialog: boolean;
  private _submitted: boolean;
  private _moduleSemestreOption: ModuleSemestreOption;

  get moduleSemestreOption(): ModuleSemestreOption {
    if (this._moduleSemestreOption == null)
      this._moduleSemestreOption = new ModuleSemestreOption();
    return this._moduleSemestreOption;
  }

  set moduleSemestreOption(value: ModuleSemestreOption) {
    this._moduleSemestreOption = value;
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

  constructor(private http:HttpClient,private messageService: MessageService) {
  }
  get seances(): Array<Seance> {
    if(this._seances==null){
      this._seances=new Array<Seance>();
    }
    return this._seances;
  }

  set seances(value: Array<Seance>) {
    this._seances = value;
  }

  get seance(): Seance {
    if(this._seance==null){
      this._seance=new Seance();
    }
    return this._seance;
  }

  set seance(value: Seance) {
    this._seance = value;
  }
  detailModuleSemestreOption(moduleSemestreOption: ModuleSemestreOption) {
    this.moduleSemestreOption=moduleSemestreOption;
    alert(this._urlBase+this._urlSeance+'/module-semestre-option/code/'+moduleSemestreOption.code);
    this.http.get<Array<Seance>>(this._urlBase+this._urlSeance+'/moduleSemestreOption/code/'+moduleSemestreOption.code).subscribe(
        data=>{
          console.log(data);
          this.seances=data;
        },error => {
          alert('error');
        }
    );
  }

    saveSeance(input1: string, input2: string, input3: string,input4: Date) {
    this.seance.libelle=input1;
    this.seance.heurDebut=input2;
    this.seance.heurFin=input3;
    this.seance.dateSeance=input4;
    this.seance.moduleSemestreOption=this.moduleSemestreOption;
    console.log(this.moduleSemestreOption);
    console.log(this.seance);
    alert(this._urlBase+this._urlSeance+'/');
    this.http.post<number>(this._urlBase+this._urlSeance+'/',this.seance).subscribe(
        data=>{
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'la seance est enregistrée',
            life: 3000
          });
          console.log(data);
        },error => {
          console.log('error');
        }
    );
      this.createDialog=false;

    }
}

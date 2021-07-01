import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {Seance} from "../model/seance.model";
import {environment} from "../../../environments/environment";
import {MyOption} from "../model/my-option.model";
import {AnneeUniversitaire} from "../model/anneeUniversitaire";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmploiService {

  constructor(private http:HttpClient,private messageService: MessageService) { }
  private _URLmoduleSemOpt = 'ispits-project/module-semestre-option/';
  private _urlS=environment.baseUrl+'seance';
  private urlOption=environment.baseUrl+'option';
  private urlAnne=environment.baseUrl+'annee-universitaire';
  private _seances:Array<Seance>;
  private _myoptions:Array<MyOption>;
  private _annees:Array<AnneeUniversitaire>;
  private _anneeSel:string;
  private _optSel:string;

    get anneeSel(): string {
        return this._anneeSel;
    }

    set anneeSel(value: string) {
        this._anneeSel = value;
    }

    get optSel(): string {
        return this._optSel;
    }

    set optSel(value: string) {
        this._optSel = value;
    }

    get annees(): Array<AnneeUniversitaire> {
    if(this._annees==null){
      this._annees=new Array<AnneeUniversitaire>();
    }
    return this._annees;
  }

  set annees(value: Array<AnneeUniversitaire>) {
    this._annees = value;
  }

  get myoptions(): Array<MyOption> {
    if(this._myoptions==null){
      this._myoptions=new Array<MyOption>();
    }
    return this._myoptions;
  }

  set myoptions(value: Array<MyOption>) {
    this._myoptions = value;
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
  /*public deleteModuleSemestreOption(): Observable<number> {
        return this.http.delete<number>(this.urlBase + this.URLmoduleSemOpt + 'code/' + this.moduleSemestreOption.code);
    }
  */

  afficherSeance(input1: string, input2: string) :Observable<Array<Seance>>{
    return this.http.get<Array<Seance>>(this._urlS+'/moduleSemestreOption/anneeUniversitaire/libelle/'+input1+'/moduleSemestreOption/option/code/'+input2);
   /* this.http.get<Array<Seance>>(this._urlS+'/moduleSemestreOption/anneeUniversitaire/libelle/'+input1+'/moduleSemestreOption/option/code/'+input2).subscribe(
        data=>{
          console.log(data);
          this.seances=data;
        },error => {
          alert('error');
        }
    );*/
  }
  getAllOptions(){
    console.log(this.urlOption+'/')
    this.http.get<Array<MyOption>>(this.urlOption +'/').subscribe(
        data => {
          this.myoptions=data;
        },error => {
          alert('error');
        });
  }

  findAllyears() {
    this.http.get<Array<AnneeUniversitaire>>(this.urlAnne +'/').subscribe(
        data => {
          this.annees=data;
        },error => {
          console.log(error);
        });
  }
}

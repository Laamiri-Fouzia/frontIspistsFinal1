import { Injectable } from '@angular/core';
import {Seance} from "../model/seance.model";
import {HttpClient} from "@angular/common/http";
import {ModuleSemestreOption} from "../model/module-semestre-option.model";
import {MyOption} from "../model/my-option.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SeanceService {
  private _urlSeance: string=environment.baseUrl+'seance';

  constructor(private http:HttpClient) {

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



}

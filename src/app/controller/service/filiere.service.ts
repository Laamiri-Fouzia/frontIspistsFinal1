import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Filiere} from "../model/filiere.model";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FiliereService {

  constructor(private http: HttpClient) { }
  private _filiere: Filiere;//selected
  private _filieres: Array<Filiere>;//items
  private _createDialog: boolean;
  private _editDialog: boolean;
  private _viewDialog: boolean;
  private _submitted: boolean;
  private urlFiliere = environment.baseUrl + 'filliere/';

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

  public save(): Observable<Filiere> {
    return this.http.post<Filiere>(this.urlFiliere, this.filiere);
  }

  public edit(): Observable<Filiere> {
    return this.http.put<Filiere>(this.urlFiliere, this.filiere);
  }

  public deleteByCode(): Observable<number> {
    return this.http.delete<number>(this.urlFiliere + 'code/' + this.filiere.code);
  }

  /*detailFiliere(f:Filiere) {//findByFilliereCode (OptionService)
    this._displayOptions=true;
    this.http.get<Array<MyOption>>(this.urlBase + this.urlOption +'/filiere/code/'+f.code).subscribe(
        data => {
          this._filiere2=f;
          this.myOptions=data;
        },error => {
          console.log(error);
        });
  }*/
}

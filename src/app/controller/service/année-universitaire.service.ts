import { Injectable } from '@angular/core';
import {AnneeUniversitaire} from "../model/anneeUniversitaire";
import {HttpClient} from "@angular/common/http";
import {MyOption} from "../model/my-option.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AnnéeUniversitaireService {

  private _years: Array<AnneeUniversitaire>;
  private urlAnne=environment.baseUrl+'année-universitaire';

  constructor(private http: HttpClient) { }

  get years(): Array<AnneeUniversitaire> {
    if(this._years==null){
      this._years=new Array<AnneeUniversitaire>();
    }
    return this._years;
  }

  set years(value: Array<AnneeUniversitaire>) {
    this._years = value;
  }
  public findAllyears(){
    this.http.get<Array<AnneeUniversitaire>>(this.urlAnne +'/').subscribe(
        data => {
          console.log(data);
          this.years=data;
        },error => {
          console.log(error);
        });
  }
}

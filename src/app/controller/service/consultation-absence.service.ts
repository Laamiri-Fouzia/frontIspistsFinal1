import { Injectable } from '@angular/core';
import {Absence} from "../model/absence.model";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ConsultationAbsenceService {

  constructor(private http:HttpClient,private messageService: MessageService) { }
  private _absence:Absence;
  private _absences:Array<Absence>;
  private _etatAbse:string;
  private _urlBase='http://localhost:8036/';
  private _urlAbsence='ispits-project/absence';
  private _displayImage:boolean=false;
  private _selectors:Array<Absence>;
  private _retrievedImage: any;


    get retrievedImage(): any {
        return this._retrievedImage;
    }
    set retrievedImage(value: any) {
        this._retrievedImage = value;
    }
    get displayImage(): boolean {
        return this._displayImage;
    }

    set displayImage(value: boolean) {
        this._displayImage = value;
    }

    get selectors(): Array<Absence> {
        if(this._selectors==null){
            this._selectors=new Array<Absence>();
        }
        return this._selectors;
    }

    set selectors(value: Array<Absence>) {
        this._selectors = value;
    }

    get etatAbse(): string {
        return this._etatAbse;
    }

    set etatAbse(value: string) {
        this._etatAbse = value;
    }

  get absence(): Absence {
    if(this._absence==null){
      this._absence=new Absence();
    }
    return this._absence;
  }

  set absence(value: Absence) {
    this._absence = value;
  }

  get absences(): Array<Absence> {
    if(this._absences==null){
      this._absences=new Array<Absence>();
    }
    return this._absences;
  }

  set absences(value: Array<Absence>) {
    this._absences = value;
  }


  chercheAbsences(input: Date) {
        var t=moment(input).format('YYYY-MM-DD');
        console.log(t);
      this.http.get<Array<Absence>>(this._urlBase+this._urlAbsence+'/seance/date/'+t).subscribe(
          data=>{
            this.absences=data;
            console.log(this.absences);
          },error => {
            alert('error');
          }
      );
  }

    updateAbsences(absences: Array<Absence>,selectors:Array<Absence>) {
        console.log(absences);
        console.log(selectors);
        if(selectors.length==0){
            for(let absence of absences){
                absence.etatJustification="refus??e";
            }
        }else{
            for(var abs of absences){
                for(var selected of selectors){
                    if(selected.id==abs.id) {
                        abs.etatJustification="accept??e";
                        break;
                    }else{
                        abs.etatJustification="refus??e";
                    }
                }
            }
        }

      console.log('pour absences:')
      console.log(absences);
      this.http.put(this._urlBase+this._urlAbsence+'/',absences).subscribe(
          data=>{
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'la modification est pris en compte',
              life: 3000
            });
          },error => {
            alert('problem  some where');
          }
     );

    }
}

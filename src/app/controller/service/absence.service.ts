import { Injectable } from '@angular/core';
import {InscriptionEtudiantModule} from "../model/inscription-etudiant-module.model";
import {Absence} from "../model/absence.model";
import {of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {


  private _editDialog:boolean=false;
  private _displayTable:boolean=false;
  private _selects:Array<InscriptionEtudiantModule>;
  private _absences:Array<Absence>;
  private _seanceSelected='';
  private _urlAbsence=environment.baseUrl+'absence/';

  constructor(private http: HttpClient,private messageService: MessageService) { }

  get absences(): Array<Absence> {
    if(this._absences==null)
      this._absences=new Array<Absence>();
    return this._absences;
  }

  set absences(value: Array<Absence>) {
    this._absences = value;
  }

  get seanceSelected(): string {
    return this._seanceSelected;
  }

  set seanceSelected(value: string) {
    this._seanceSelected = value;
  }
  get editDialog(): boolean {
    return this._editDialog;
  }

  set editDialog(value: boolean) {
    this._editDialog = value;
  }

  get selects(): Array<InscriptionEtudiantModule> {
    if(this._selects==null)
      this._selects=new Array<InscriptionEtudiantModule>();
    return this._selects;
  }

  set selects(value: Array<InscriptionEtudiantModule>) {
    this._selects = value;
  }

  validerAbsence() {
    console.log('hada selects')
    console.log(this.selects)
    console.log('hadi seance ')
    console.log(this.seanceSelected)
     for(var inscriptionModule of this.selects){
       let absence =new Absence();
       absence.seance.libelle=this.seanceSelected;
       absence.etudiant.cne=inscriptionModule.etudiant.cne;

       if(this.absences==null)
         alert(2);
       this.absences.push(absence);
    }
    console.log('hada absences')
    console.log(this.absences)
    this.http.post(this._urlAbsence,this.absences).subscribe(
        data => {
           if(data==1)
             this.messageService.add({
               severity: 'success',
               summary: 'Successful',
               detail: 'modification bien enregistré! ',
             });
           else if(data==-1){
             this.messageService.add({
               severity: 'error',
               summary: 'Error !',
               detail: 'Attention :Absence deja saisi',
             });
             this.absences=new Array<Absence>();
           }else
             this.messageService.add({
               severity: 'error',
               summary: 'Error !',
               detail: 'Operation echouée :Réssayer une eutre fois !',
             });

        }, error => {
          console.log(error);
        }
    );

  }

  get displayTable(): boolean {
    return this._displayTable;
  }

  set displayTable(value: boolean) {
    this._displayTable = value;
  }
}

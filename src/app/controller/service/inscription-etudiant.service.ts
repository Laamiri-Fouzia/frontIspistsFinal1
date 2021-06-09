import {Injectable} from '@angular/core';
import {EtudiantOption} from "../model/etudiant-option.model";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ConfirmationService, MessageService} from "primeng/api";
import * as XLSX from "xlsx";
import {Observable} from "rxjs";
import {InscriptionEtudiantModule} from "../model/inscription-etudiant-module.model";
import {Etudiant} from "../model/etudiant.model";
import * as moment from "moment";

@Injectable({
    providedIn: 'root'
})
export class InscriptionEtudiantService {

    private urlEtudiantOption = environment.baseUrl + 'etudiantOption/';
    private _inscriptionEtudiants:Array<InscriptionEtudiantModule>;
    private urlEtudiant = environment.baseUrl + 'Etudiant/';
    private urlInscriptionModule=environment.baseUrl + 'inscriptionEtudiantModule/';
    private _optSelec: string;
    public date:Date;
    constructor(private http: HttpClient, private confirmationService: ConfirmationService, private messageService: MessageService) {
    }

    private _createDialog: boolean;

    get createDialog(): boolean {
        return this._createDialog;
    }
    set createDialog(value: boolean) {
        this._createDialog = value;
    }

    private _editDialog: boolean;

    get editDialog(): boolean {
        return this._editDialog;
    }

    set editDialog(value: boolean) {
        this._editDialog = value;
    }

    private _etudiantOption: EtudiantOption;

    get etudiantOption(): EtudiantOption {
        if (this._etudiantOption == null) {
            this._etudiantOption = new EtudiantOption();
        }
        return this._etudiantOption;
    }

    set etudiantOption(value: EtudiantOption) {
        this._etudiantOption = value;
    }

    private _etudiantOptions: Array<EtudiantOption>;

    get etudiantOptions(): Array<EtudiantOption> {
        if (this._etudiantOptions == null) {
            this._etudiantOptions = new Array<EtudiantOption>();
        }
        return this._etudiantOptions;
    }

    set etudiantOptions(value: Array<EtudiantOption>) {
        this._etudiantOptions = value;
    }

    private _etudiantAnciens: Array<EtudiantOption>;

    get etudiantAnciens(): Array<EtudiantOption> {
        if (this._etudiantAnciens == null)
            this._etudiantAnciens = new Array<EtudiantOption>();
        return this._etudiantAnciens;
    }

    set etudiantAnciens(value: Array<EtudiantOption>) {
        this._etudiantAnciens = value;
    }
     public cloneEtudiant(e:Etudiant){
        let etudiant=new Etudiant();
        etudiant.cne=e.cne
        etudiant.cin=e.cin
        etudiant.nom=e.nom
        etudiant.prenom=e.prenom
        etudiant.dateInscription=e.dateInscription
        etudiant.dateNaissance=e.dateNaissance
        return etudiant;
     }
    public cloneEtudiantOption(etudianOption:EtudiantOption):EtudiantOption{
        let  nvEtudiantOption: EtudiantOption = new EtudiantOption();
        nvEtudiantOption.etudiant= this.cloneEtudiant(etudianOption.etudiant);
        nvEtudiantOption.myOption= {...etudianOption.myOption}
        nvEtudiantOption.anneeUniversitaire= {...etudianOption.anneeUniversitaire}
        nvEtudiantOption.semestre= {...etudianOption.semestre}
        nvEtudiantOption.id=etudianOption.id
        return nvEtudiantOption;
    }
    private _anneselect: number;

    SearchStudent() {
        let semestreCode = 1;
        this.http.get<Array<EtudiantOption>>(this.urlEtudiantOption + 'AncienEtudiant/option/code/' + this.optSelec + '/annee/' + this.anneselect + '/semestre/codesemes/' + semestreCode).subscribe(
            data => {
                this.etudiantOptions = data;
            }, error => {
                console.log(error);
            }
        );
    }


    SearchAncienStudent() {
        let annee = this.etudiantOption.anneeUniversitaire.anneeOne;
        let optionCode = this.etudiantOption.myOption.code;
        let semestreCode = this.etudiantOption.semestre.code;
        console.log(this.etudiantOption);
        this.http.get<Array<EtudiantOption>>(this.urlEtudiantOption + 'AncienEtudiant/option/code/' + optionCode + '/annee/' + annee + '/semestre/codesemes/' + semestreCode).subscribe(
            data => {
                this.etudiantAnciens = data;
            }, error => {
                console.log(error);
            }
        );
    }


    /*saveNewEtudiant() {
        console.log('hda sav')
        console.log(this.etudiantOptions)
        this.etudiantOption.semestre.code=1;
        this.etudiantOption.anneeUniversitaire.anneeOne=this._anneselect;
        this.etudiantOption.myOption.code=this._optSelec;
        this.etudiantOption.etudiant.dateInscription=new Date();
        this.http.post(this.urlEtudiantOption + 'newEtudiant/', this.etudiantOption).subscribe(
            data => {
                console.log('flfwl')
                console.log(this.etudiantOption)
                if (data == 1) {
                    let j=this.cloneEtudiantOption(this.etudiantOption);
                    this.etudiantOptions.push(j);
                    this.etudiantOption.myOption.code='hh';
                    console.log('hada clone')
                    console.log(j)
                    console.log('hada l3adi')
                    console.log(this.etudiantOption)
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Etudiant bien enregistré! ',
                    });
                    console.log('ha ljdwel 9bl null')
                    console.log(this.etudiantOptions)
                    this.etudiantOption=null;
                    console.log('ha ljdwel bed null')
                    console.log(this.etudiantOptions)
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error !',
                        detail: 'Etudiant avec Cne: '+this.etudiantOption.etudiant.cne+'  deja existe !'
                    });
                }

                }, error => {
                console.log(error);
                this.etudiantOption=null;
            }
        );

    }*/

    saveNewEtudiant() {
        this.etudiantOption.semestre.code=1;
        this.etudiantOption.anneeUniversitaire.anneeOne=this._anneselect;
        this.etudiantOption.myOption.code=this._optSelec;
        this.etudiantOption.etudiant.dateInscription=moment(new Date()).format('YYYY-MM-DD');
        this.http.post(this.urlEtudiantOption + 'newEtudiant/', this.etudiantOption).subscribe(
            data => {
                if (data == 1) {
                    let j=this.cloneEtudiantOption(this.etudiantOption);
                    this.etudiantOptions.push(j);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Etudiant bien enregistré! ',
                    });
                    //this.etudiantOption=new EtudiantOption();
                    console.log('hada j')
                    console.log(j.etudiant)
                    console.log('hada etudiant li khwit ')
                    console.log(this.etudiantOption.etudiant)

                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error !',
                        detail: 'Etudiant avec Cne: '+this.etudiantOption.etudiant.cne+'  deja existe !'
                    });
                }
                }, error => {
                console.log(error);
            }
        );
    }




  clone (etudiantOption:EtudiantOption){
        let etuOp=new EtudiantOption();
        etuOp.myOption= {...etudiantOption.myOption};
        etuOp.etudiant= {...etudiantOption.etudiant};
        etuOp.semestre= {...etudiantOption.semestre};
        etuOp.anneeUniversitaire= {...etudiantOption.anneeUniversitaire};
        etuOp.id=etudiantOption.id;
        return etuOp;
  }
    EditStudent() {
        console.log(this.etudiantOption)
        this.http.put(this.urlEtudiant, this.etudiantOption.etudiant).subscribe(
            data =>{
                if (data == 1) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'la modification est effectuée ',
                        life: 3000
                    });
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error !',
                        detail: 'Operation echouée .Réssayer une autre fois !'
                    });
                }
                this.etudiantOption=null;
            }, error => {
                console.log(error);
            }
        );
    }


    deleteEtudiantOption() {
        this.http.delete<number>(this.urlEtudiantOption + '/Etudiant/cne/' + this.etudiantOption.etudiant.cne).subscribe(
            data => {
            }, error => {
                console.log(error);
            }
        );
    }

    chercherEtudiant(code:string){
        this.http.get<Array<InscriptionEtudiantModule>>( this.urlInscriptionModule+'moduleSemestreOption/code/'+code).subscribe(
            data => {
                this.inscriptionEtudiants = data;
            }, error => {
                console.log(error);
            }
        );
    }

    get optSelec(): string {
        return this._optSelec;
    }

    set optSelec(value: string) {
        this._optSelec = value;
    }

    get anneselect(): number {
        return this._anneselect;
    }

    set anneselect(value: number) {
        this._anneselect = value;
    }

    //import/export excel

    public importFromFile(bstr: string): XLSX.AOA2SheetOpts {
        // bax i9rah
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        // 3la l first sheet
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /*save data en va le supprimer apres*/
        const data = <XLSX.AOA2SheetOpts>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
        return data;
    }
    public testExport ():Observable<Blob>{
        return this.http.get(this.urlEtudiantOption+'etudiants/export/excel',{responseType: 'blob'})

    }
    get inscriptionEtudiants(): Array<InscriptionEtudiantModule> {
        if(this._inscriptionEtudiants==null)
            this._inscriptionEtudiants=new Array<InscriptionEtudiantModule>();
        return this._inscriptionEtudiants;
    }

    set inscriptionEtudiants(value: Array<InscriptionEtudiantModule>) {
        this._inscriptionEtudiants = value;
    }
}

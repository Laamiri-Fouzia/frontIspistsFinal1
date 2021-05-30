import {Injectable} from '@angular/core';
import {EtudiantOption} from "../model/etudiant-option.model";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ConfirmationService, MessageService} from "primeng/api";
import * as XLSX from 'xlsx';
import {Etudiant} from "../model/etudiant.model";
import {Observable} from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class InscriptionEtudiantService {

    private urlEtudiantOption = environment.baseUrl + 'etudiantOption/';
    private urlEtudiant = environment.baseUrl + 'Etudiant/';
    private _optSelec: string;
    public date: Date;
    private _etudiantOption: EtudiantOption;
    private _etudiantOptions: Array<EtudiantOption>;
    private _etudiants:Array<Etudiant>;

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


    get etudiantOption(): EtudiantOption {
        if (this._etudiantOption == null) {
            this._etudiantOption = new EtudiantOption();
        }
        return this._etudiantOption;
    }

    set etudiantOption(value: EtudiantOption) {
        this._etudiantOption = value;
    }

    get etudiantOptions(): Array<EtudiantOption> {
        if (this._etudiantOptions == null) {
            this._etudiantOptions = new Array<EtudiantOption>();
        }
        return this._etudiantOptions;
    }

    set etudiantOptions(value: Array<EtudiantOption>) {
        this._etudiantOptions = value;
    }


    get etudiants(): Array<Etudiant> {
        if (this._etudiants == null) {
            this._etudiants = new Array<Etudiant>();
        }
        return this._etudiants;
    }

    set etudiants(value: Array<Etudiant>) {
        this._etudiants = value;
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

    /*public cloneEtudiantOption(etudianOption:EtudiantOption):EtudiantOption{
        let  nvEtudiantOption: EtudiantOption = new EtudiantOption();
        nvEtudiantOption.etudiant=etudianOption.etudiant
        nvEtudiantOption.myOption=etudianOption.myOption
        nvEtudiantOption.annee=etudianOption.annee
        nvEtudiantOption.semestre=etudianOption.semestre
        nvEtudiantOption.id=etudianOption.id
        return nvEtudiantOption;
    }*/
    private _anneselect: number;

    SearchStudent() {
        let semestreCode = 1;
        this.http.get<Array<EtudiantOption>>(this.urlEtudiantOption + 'AncienEtudiant/option/code/' + this.optSelec + '/annee/' + this.anneselect + '/semestre/codesemes/' + semestreCode).subscribe(
            data => {
                console.log(data)
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
                console.log(data)
                this.etudiantAnciens = data;
            }, error => {
                console.log(error);
            }
        );
    }


    saveNewEtudiant() {
        this.etudiantOption.semestre.code = 1;
        this.etudiantOption.anneeUniversitaire.anneeOne = this._anneselect;
        this.etudiantOption.myOption.code = this._optSelec;
        console.log(this.etudiantOption);
        this.http.post(this.urlEtudiantOption + 'newEtudiant/', this.etudiantOption).subscribe(
            data => {
                console.log(this.etudiantOption);

                if (data == 1) {
                    this.etudiantOptions.push(this.clone(this.etudiantOption));
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Etudiant bien enregistré! ',
                    });
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error !',
                        detail: 'Etudiant avec Cne: ' + this.etudiantOption.etudiant.cne + '  deja existe !'
                    });
                }
                this.etudiantOption = null;
            }, error => {
                console.log(error);
            }
        );
    }

    clone(etudiantOption: EtudiantOption) {
        let etuOp = new EtudiantOption();
        etuOp.myOption = {...etudiantOption.myOption};
        etuOp.etudiant = {...etudiantOption.etudiant};
        etuOp.semestre = {...etudiantOption.semestre};
        etuOp.anneeUniversitaire = {...etudiantOption.anneeUniversitaire};
        etuOp.id = etudiantOption.id;
        return etuOp;
    }

    EditStudent() {
        console.log(this.etudiantOption);
        this.http.put(this.urlEtudiant, this.etudiantOption.etudiant).subscribe(
            data => {
                console.log(this.etudiantOption);
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
                this.etudiantOption = null;
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


   /*onFileChange(evt: any) {
        const target: DataTransfer = <DataTransfer>(evt.target);

        if (target.files.length !== 1) {
            throw new Error('Cannot use multiple files');
        }

        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
            const bstr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];
            const data = <XLSX.AOA2SheetOpts>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
            //this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
            /*const bstr: string = e.target.result;
            const data = <any[]>this.inscriptionEtudiantService.importFromFile(bstr);

            const header: string[] = Object.getOwnPropertyNames(new EtudiantOption());
            const importedData = data.slice(1,-1);*/


            /*const x = this.data.slice(1);//the slice() method returns the selected elements in a array object
            for (let i = 0; i < x.length; i++) { // for pour stocker data in base de donnes
                // console.log(x[i]);
                for (let j = 0; j <= x[i].length; j++) {
                    console.log(x[i][j]);
                    //this.bareme.stationHydrologie.nomStation = this.stationnom;
                    //this.etudiantOption.etudiant.nom=this.lk;
                    if (j == 0) {
                        this.etudiantOption.etudiant.cne = x[i][j];
                    } else if (j == 1) {
                        this.etudiantOption.etudiant.cin = x[i][j];
                    } else if (j == 2) {
                        this.etudiantOption.etudiant.nom = x[i][j];
                    } else if (j == 3) {
                        this.etudiantOption.etudiant.prenom = x[i][j];

                    }
                    this.saveNewEtudiant();

                }
            }
            ;
            reader.readAsBinaryString(target.files[0]);

        }


    }*/

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
        //return this.http.get('${this.urlEtudiantOption}/etudiants/export/excel',{responseType: 'blob'})
        return this.http.get(this.urlEtudiantOption+'etudiants/export/excel',{responseType: 'blob'})

    }
}

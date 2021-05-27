import {Injectable} from '@angular/core';
import {EtudiantOption} from "../model/etudiant-option.model";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MyModule} from "../model/myModule.model";
import {ConfirmationService, MessageService} from "primeng/api";

@Injectable({
    providedIn: 'root'
})
export class InscriptionEtudiantService {

    private urlEtudiantOption = environment.baseUrl + 'etudiantOption/';
    private urlEtudiant = environment.baseUrl + 'Etudiant/';
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
        this.etudiantOption.semestre.code=1;
        this.etudiantOption.anneeUniversitaire.anneeOne=this._anneselect;
        this.etudiantOption.myOption.code=this._optSelec;
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
                        detail: 'Etudiant avec Cne: '+this.etudiantOption.etudiant.cne+'  deja existe !'
                    });
                }
                 this.etudiantOption=null;
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
        console.log(this.etudiantOption);
        this.http.put(this.urlEtudiant, this.etudiantOption.etudiant).subscribe(
            data =>{
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

}
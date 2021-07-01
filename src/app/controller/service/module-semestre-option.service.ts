import {Injectable} from '@angular/core';
import {ModuleSemestreOption} from "../model/module-semestre-option.model";
import {HttpClient} from "@angular/common/http";
import {MyOption} from "../model/my-option.model";
import {Semestre} from "../model/semestre.model";
import {Observable} from "rxjs";
import {MessageService} from "primeng/api";
import {Seance} from "../model/seance.model";
import {environment} from "../../../environments/environment";
import {Etudiant} from "../model/etudiant.model";
import {MyModule} from "../model/myModule.model";
import {Filiere} from "../model/filiere.model";


@Injectable({
    providedIn: 'root'
})
export class ModuleSemestreOptionService {

    private URLmoduleSemOpt = 'ispits-project/module-semestre-option/';
    private urlBase = 'http://localhost:8036/';//http://localhost:8036/ispits-project/module-semestre-option/
    private _moduleSemestreOption: ModuleSemestreOption;
    private _createDialog: boolean;
    private _editDialog: boolean;
    private _viewDialog: boolean;
    private _submitted: boolean;
    private _createDialog1: boolean;
    private _editDialog1: boolean;
    private _viewDialog1: boolean;
    private _submitted1: boolean;
    private urlOption=environment.baseUrl+'option';
    private _filieres:Array<Filiere>;
    private _options:Array<MyOption>;
    private _modules:Array<MyModule>;
    private _etudiants:Array<Etudiant>;
    private urlEtudiant = environment.baseUrl + 'Etudiant';
    private urlFiliere = environment.baseUrl + 'filliere';
    private urlModule = environment.baseUrl + 'module';

    constructor(private http: HttpClient, private messageService: MessageService) {
    }

    get forOption(): string {
        return this._forOption;
    }

    set forOption(value: string) {
        this._forOption = value;
    }
    get filieres(): Array<Filiere> {
        if(this._filieres==null){
            this._filieres=new Array<Filiere>();
        }
        return this._filieres;
    }

    set filieres(value: Array<Filiere>) {
        this._filieres = value;
    }

    get options(): Array<MyOption> {
        if(this._options==null){
            this._options=new Array<MyOption>();
        }
        return this._options;
    }

    set options(value: Array<MyOption>) {
        this._options = value;
    }

    get modules(): Array<MyModule> {
        if(this._modules==null){
            this._modules=new Array<MyModule>();
        }
        return this._modules;
    }

    set modules(value: Array<MyModule>) {
        this._modules = value;
    }

    get etudiants(): Array<Etudiant> {
        if(this._etudiants==null){
            this._etudiants=new Array<Etudiant>();
        }
        return this._etudiants;
    }

    set etudiants(value: Array<Etudiant>) {
        this._etudiants = value;
    }
    get createDialog1(): boolean {
        return this._createDialog1;
    }

    set createDialog1(value: boolean) {
        this._createDialog1 = value;
    }

    get editDialog1(): boolean {
        return this._editDialog1;
    }

    set editDialog1(value: boolean) {
        this._editDialog1 = value;
    }

    get viewDialog1(): boolean {
        return this._viewDialog1;
    }

    set viewDialog1(value: boolean) {
        this._viewDialog1 = value;
    }

    get submitted1(): boolean {
        return this._submitted1;
    }

    set submitted1(value: boolean) {
        this._submitted1 = value;
    }
    set displayModules(value: boolean) {
        this._displayModules = value;
    }
    get moduleSemestreOption(): ModuleSemestreOption {
        if (this._moduleSemestreOption == null)
            this._moduleSemestreOption = new ModuleSemestreOption();
        return this._moduleSemestreOption;
    }

    set moduleSemestreOption(value: ModuleSemestreOption) {
        this._moduleSemestreOption = value;
    }

    private _moduleSemestreOptions: Array<ModuleSemestreOption>;

    get moduleSemestreOptions(): Array<ModuleSemestreOption> {
        if (this._moduleSemestreOptions == null)
            this._moduleSemestreOptions = new Array<ModuleSemestreOption>();
        return this._moduleSemestreOptions;
    }

    set moduleSemestreOptions(value: Array<ModuleSemestreOption>) {
        this._moduleSemestreOptions = value;
    }

    private _semesters: Array<Semestre>;

    get semesters(): Array<Semestre> {
        if (this._semesters == null)
            this._semesters = new Array<Semestre>();
        return this._semesters;
    }

    set semesters(value: Array<Semestre>) {
        this._semesters = value;
    }

    private _displayModules: boolean = false;

    get displayModules(): boolean {
        return this._displayModules;
    }

    private _anneUniveSelec: number;

    get anneUniveSelec(): number {
        return this._anneUniveSelec;
    }

    set anneUniveSelec(value: number) {
        this._anneUniveSelec = value;
    }

    private _OptionSelec = '';

    get OptionSelec(): string {
        return this._OptionSelec;
    }

    set OptionSelec(value: string) {
        this._OptionSelec = value;
    }

    private _semestreselec: number;

    get semestreselec(): number {
        return this._semestreselec;
    }

    set semestreselec(value: number) {
        this._semestreselec = value;
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

    private _typeSelec = '';

    get typeSelec(): string {
        return this._typeSelec;
    }


    //detaill Ta3 option

    set typeSelec(value: string) {
        this._typeSelec = value;
    }

    private _moduleSelec = '';

    get moduleSelec(): string {
        return this._moduleSelec;
    }

    set moduleSelec(value: string) {
        this._moduleSelec = value;
    }

    /*findByOptionCode() {
        let urlFind = 'semestre/code/' + this.semestreselec + '/anneeuniv/' + this.anneUniveSelec + '/option/code/' + this.moduleSemestreOption.myOption.code;

        this.http.get<Array<ModuleSemestreOption>>(this.urlBase + this.URLmoduleSemOpt + urlFind).subscribe(
            data => {
                this.moduleSemestreOptions = data;
            }, error => {
                console.log(error);
            }
        );
    }*/

    findByOptionCode() {
        let urlFind='semestre/code/'+this.semestreselec+'/anneeuniv/anneeOne/'+this.anneUniveSelec+'/option/code/'+this.forOption;
        this.http.get<Array<ModuleSemestreOption>>(this.urlBase + this.URLmoduleSemOpt +urlFind).subscribe(
            data => {
                console.log(data)
                this.moduleSemestreOptions = data;
            }, error => {
                console.log(error);
            }
        );
    }

    findOptionByCode(){
        this.http.get<MyOption>( this.urlOption +'/code/'+this.forOption).subscribe(
            data => {
                console.log('ana kyn f find hada howa option')

                this.moduleSemestreOption.myOption=data;
                console.log(this.moduleSemestreOption.myOption)
            },error => {
                console.log(error);
            });
    }
    private _forOption:string;
    saveOptionSemestreModule(moduleselect: string, typemoduleselect: string) {
        this.submitted = true;
        this.moduleSemestreOption.myOption.code=this._forOption;
        this.moduleSemestreOption.code = this.moduleSemestreOption.myOption.code + moduleselect + this.semestreselec+this.anneUniveSelec;
        this.moduleSemestreOption.myModule.code = moduleselect;
        this.moduleSemestreOption.typeModule.code = typemoduleselect;
        this.moduleSemestreOption.semestre.code = this.semestreselec;
        this.moduleSemestreOption.anneeUniversitaire.anneeOne=this.anneUniveSelec;
        console.log('save d service ');
        console.log(this.moduleSemestreOption);

        if (this.moduleSemestreOption.code.trim()) {
            this.http.post<number>(this.urlBase + this.URLmoduleSemOpt, this.moduleSemestreOption).subscribe(
                data => {
                    this.moduleSemestreOptions.push(this.cloneModuleSemestreOption(this.moduleSemestreOption));
                    this.moduleSemestreOption=null;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'le module est ajouter',
                        life: 3000
                    });
                },error => {
                    console.log(error);
                    this.moduleSemestreOption=new ModuleSemestreOption();
                }
                );
            this.createDialog = false;

        }
    }

    public cloneModuleSemestreOption(mos: ModuleSemestreOption) {
        let moduleSemestreOption: ModuleSemestreOption = new ModuleSemestreOption();
        moduleSemestreOption.code = mos.code;
        moduleSemestreOption.anneeUniversitaire = mos.anneeUniversitaire;
        moduleSemestreOption.semestre = {...mos.semestre};
        moduleSemestreOption.myOption = {...mos.myOption};
        moduleSemestreOption.myModule = {...mos.myModule};
        moduleSemestreOption.typeModule = {...mos.typeModule};
        return moduleSemestreOption;
    }

    choisirParam(myOption: MyOption) {
        this._forOption = myOption.code;
    }


    public deleteModuleSemestreOption(): Observable<number> {
        return this.http.delete<number>(this.urlBase + this.URLmoduleSemOpt + 'code/' + this.moduleSemestreOption.code);
    }
    getAllOptions(){
        this.http.get<Array<MyOption>>(this.urlOption +'/').subscribe(
            data => {
                this.options=data;
            },error => {
                console.log(error);
            });
    }
    getAllEtudiants(){
        this.http.get<Array<Etudiant>>(this.urlEtudiant +'/').subscribe(
            data => {
                this.etudiants=data;
            },error => {
                console.log(error);
            });
    }
    getAllFilieres(){
        this.http.get<Array<Filiere>>(this.urlFiliere +'/').subscribe(
            data => {
                this.filieres=data;
            },error => {
                console.log(error);
            });
    }
    getAllModules(){
        this.http.get<Array<MyModule>>(this.urlModule +'/').subscribe(
            data => {
                this.modules=data;
            },error => {
                console.log(error);
            });
    }

}
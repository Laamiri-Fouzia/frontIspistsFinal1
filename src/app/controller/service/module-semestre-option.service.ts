import { Injectable } from '@angular/core';
import {ModuleSemestreOption} from "../model/module-semestre-option.model";
import {HttpClient} from "@angular/common/http";
import {MyOption} from "../model/my-option.model";



@Injectable({
  providedIn: 'root'
})
export class ModuleSemestreOptionService {
  private URLmoduleSemOpt='ispits-project/module-semestre-option/';

  constructor(private http:HttpClient) { }

  private urlBase='http://localhost:8036/';
  private _moduleSemestreOption:ModuleSemestreOption;
  private _moduleSemestreOptions:Array<ModuleSemestreOption>;
  private _displayModules: boolean=false;
  private _anneUniveSelec = '';
  private _OptionSelec = '';
  private _semestreselec = '';

  get displayModules(): boolean {
    return this._displayModules;
  }

  get moduleSemestreOption(): ModuleSemestreOption {
    if(this._moduleSemestreOption==null)
      this._moduleSemestreOption=new ModuleSemestreOption();
    return this._moduleSemestreOption;
  }

  set moduleSemestreOption(value: ModuleSemestreOption) {
    this._moduleSemestreOption = value;
  }

  get moduleSemestreOptions(): Array<ModuleSemestreOption> {
    if(this._moduleSemestreOptions==null)
      this._moduleSemestreOptions=new Array<ModuleSemestreOption>();
    return this._moduleSemestreOptions;
  }

  set moduleSemestreOptions(value: Array<ModuleSemestreOption>) {
    this._moduleSemestreOptions = value;
  }

  findByOptionCode() {
    let urlFind='semestre/code/'+this.semestreselec+'/anneeuniv/'+this.anneUniveSelec+'/option/code/'+this.moduleSemestreOption.myOption.code;
    this.http.get<Array<ModuleSemestreOption>>(this.urlBase + this.URLmoduleSemOpt +urlFind).subscribe(
        data => {
          this.moduleSemestreOptions = data;
        }, error => {
          console.log(error);
        }
    );
  }

  saveOptionSemestreModule(moduleselect: string, typemoduleselect: string) {
    this.moduleSemestreOption.code=this.moduleSemestreOption.myOption.code+moduleselect+this.semestreselec;
    this.moduleSemestreOption.myModule.code=moduleselect;
    console.log(this.moduleSemestreOption.myModule.code);
    this.moduleSemestreOption.typeModule.code=typemoduleselect;
    this.moduleSemestreOption.semestre.code=this.semestreselec;
    this.moduleSemestreOption.anneeUnvers=this.anneUniveSelec;
    console.log(this.moduleSemestreOption);
    this.http.post<number>(this.urlBase + this.URLmoduleSemOpt ,this.moduleSemestreOption).subscribe(

        data=>{
          alert(data);
          this.moduleSemestreOptions.push(this.moduleSemestreOption);
          //this.moduleSemestreOption=null;
        },error => {
          console.log(error);
        }
    );
  }

  get anneUniveSelec(): string {
    return this._anneUniveSelec;
  }

  set anneUniveSelec(value: string) {
    this._anneUniveSelec = value;
  }

  get semestreselec(): string {
    return this._semestreselec;
  }

  set semestreselec(value: string) {
    this._semestreselec = value;
  }

  choisirParam(myOption: MyOption) {
    this._displayModules=true;
    this.moduleSemestreOption.myOption=myOption;
  }

  get OptionSelec(): string {
    return this._OptionSelec;
  }

  set OptionSelec(value: string) {
    this._OptionSelec = value;
  }

}


import { Component, OnInit } from '@angular/core';
import {NoteEtudiantModuleService} from "../../../controller/service/note-etudiant-module.service";
import {FiliereService} from "../../../controller/service/filiere.service";
import {ModuleSemestreOptionService} from "../../../controller/service/module-semestre-option.service";
import {NoteEtudiantModule} from "../../../controller/model/note-etudiant-module.model";
import {MyOption} from "../../../controller/model/my-option.model";
import {ModuleSemestreOption} from "../../../controller/model/module-semestre-option.model";
import {newArray} from "@angular/compiler/src/util";

@Component({
  selector: 'app-note-etudiant-module',
  templateUrl: './note-etudiant-module.component.html',
  styleUrls: ['./note-etudiant-module.component.scss']
})
export class NoteEtudiantModuleComponent implements OnInit {

  input1:number;
  input2='';
  input3:number;
  displaytable: boolean=false;
  input4 ='';
  years: any[];
  options: any[]=new Array();

  constructor(private moduleSemestreOptionService:ModuleSemestreOptionService,private filiereService:FiliereService, private noteEtudiantModuleService:NoteEtudiantModuleService) {
    //anne ce que l'utilisateur voie et code ce qui est stocke

    this.years=[
      {annee: 2021, code: 2021},
      {annee:2021, code:2021},
      {annee: 2021, code: 2021},
      {annee: 2021, code: 2021},
      {annee:2021, code: 2021}
    ];


  }

  ngOnInit(): void {
    this.filiereService.getAllOptions();
    //this.options.push({label: 'Select', value: null});

    //alert(this.myOptions.length)
    /*for(let  i = 0; i < this.myOptions.length; i++) {
      this.options.push({label: 'Select', value: null});
      //this.options.push({label: this.myOptions[i].libelle, value: this.myOptions[i].code});
    }*/
  }

  get myOptions(): Array<MyOption> {
    return this.filiereService.myOptions;
  }
  change1() {
    this.moduleSemestreOptionService.anneUniveSelec=this.input1;
    for(let  i = 0; i < this.myOptions.length; i++) {
      this.options.push({label: this.myOptions[i].libelle, value: this.myOptions[i].code});
    }

  }
  change2() {
    this.moduleSemestreOptionService.moduleSemestreOption.myOption.code=this.input2;
  }
  change3() {
    this.moduleSemestreOptionService.semestreselec=this.input3;
    this.moduleSemestreOptionService.findByOptionCode();
  }
  get moduleSemestreOptions(): Array<ModuleSemestreOption> {
    return this.moduleSemestreOptionService.moduleSemestreOptions;
  }



  get notesEtudiantModule(): Array<NoteEtudiantModule> {
    return this.noteEtudiantModuleService.notesEtudiantModule;
  }
  set noteEtudiantModule(value: NoteEtudiantModule) {
    this.noteEtudiantModuleService.noteEtudiantModule=value;
  }

  serachEtudiant(opt:string,semestre:number,module:string) {

    this.displaytable=true;
    this.noteEtudiantModuleService.serachEtudiant(opt,semestre,module);
  }



}

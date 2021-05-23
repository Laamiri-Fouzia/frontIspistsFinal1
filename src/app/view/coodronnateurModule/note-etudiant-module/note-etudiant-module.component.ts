import { Component, OnInit } from '@angular/core';
import {NoteEtudiantModuleService} from "../../../controller/service/note-etudiant-module.service";
import {FiliereService} from "../../../controller/service/filiere.service";
import {ModuleSemestreOptionService} from "../../../controller/service/module-semestre-option.service";
import {NoteEtudiantModule} from "../../../controller/model/note-etudiant-module.model";
import {MyOption} from "../../../controller/model/my-option.model";
import {ModuleSemestreOption} from "../../../controller/model/module-semestre-option.model";

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
  modules: any[]=new Array();
  cols: any[];
  options: any[]=new Array();
  semestres: any[]=new Array();

  constructor(private moduleSemestreOptionService:ModuleSemestreOptionService,private filiereService:FiliereService, private noteEtudiantModuleService:NoteEtudiantModuleService) {
    //anne ce que l'utilisateur voie et code ce qui est stocke

    this.years=[
      {annee: "Annee universitaire:", code: null},
      {annee: 2020, code: 2020},
      {annee:2021, code:2021},
      {annee: 2022, code: 2022},
      {annee: 2023, code: 2023},
      {annee:2024, code: 2024}
    ];

    this.semestres=[
      {label: "Semestre :", value: null},
      {label: "Semestre 1", value: 1},
      {label: "Semestre 2", value: 2},
      {label:  "Semestre 3",value: 3},
      {label:  "Semestre 4",value: 4},
      {label: "Semestre 5", value: 5},
      {label: "Semestre 6", value: 6}
    ];

  }

  ngOnInit(): void {
    this.filiereService.getAllOptions();
    this.options.push({label: 'Option :', value: null});
    this.modules.push({label: 'Module  :', value: null});
    console.log( this.modules);
  }

  private initCol() {
    this.cols = [
      {field: 'Etudiant', header: 'Etudiant'},
      {field: 'note continue', header: 'note continue'},
      {field: 'note Finale avant Rat', header: 'note Finale avant Rat'},
      {field: 'Note module session normale', header: 'Note module session normale'},
      {field: 'Resultat', header: 'Resultat'},
      {field: 'Action', header: 'Action'}
    ];
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
  change4() {
    if(this.modules.length<=this.moduleSemestreOptions.length){
      for(let  i = 0; i < this.moduleSemestreOptions.length; i++) {
        this.modules.push({label: this.moduleSemestreOptions[i].myModule.libelle, value: this.moduleSemestreOptions[i].code});
      }
    }

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

  set editDialog(value: boolean) {
    this.noteEtudiantModuleService.editDialog = value;
  }

  get editDialog(): boolean {
    return this.noteEtudiantModuleService.editDialog;
  }


  serachEtudiant(opt:string,semestre:number,module:string) {

    this.noteEtudiantModuleService.serachEtudiant(opt,semestre,module);
  }
  public edit(note: NoteEtudiantModule) {
    this.noteEtudiantModule = {...note};
    this.editDialog = true;

  }

}

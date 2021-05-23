import { Component, OnInit } from '@angular/core';
import {ModuleSemestreOptionService} from "../../../controller/service/module-semestre-option.service";
import {FiliereService} from "../../../controller/service/filiere.service";
import {NoteEtudiantModuleService} from "../../../controller/service/note-etudiant-module.service";
import {MyOption} from "../../../controller/model/my-option.model";
import {ModuleSemestreOption} from "../../../controller/model/module-semestre-option.model";
import {NoteEtudiantModule} from "../../../controller/model/note-etudiant-module.model";
import {InscriptionEtudiantService} from "../../../controller/service/inscription-etudiant.service";
import {EtudiantOption} from "../../../controller/model/etudiant-option.model";
import {MyModule} from "../../../controller/model/myModule.model";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-inscription-nouveau-etudiant',
  templateUrl: './inscription-nouveau-etudiant.component.html',
  styleUrls: ['./inscription-nouveau-etudiant.component.scss']
})
export class InscriptionNouveauEtudiantComponent implements OnInit {

  input1:number;
  input2='';
  input3:number;
  input4 ='';
  years: any[];
  cols: any[];
  options: any[]=new Array();
  semestres: any[]=new Array();

  constructor(private messageService: MessageService,private inscriptionEtudiantService:InscriptionEtudiantService,private filiereService:FiliereService,private confirmationService: ConfirmationService, private noteEtudiantModuleService:NoteEtudiantModuleService) {
    //anne ce que l'utilisateur voit et code ce qui est stocke

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

  }

  private initCol() {
    this.cols = [
      {field: 'CNE', header: 'CNE'},
      {field: 'NOM', header: 'NOM'},
      {field: 'PRENOM', header: 'PRENOM'},
      {field: 'Action', header: 'Action'}
    ];
  }

  get myOptions(): Array<MyOption> {
    return this.filiereService.myOptions;
  }
  change1() {
    for(let  i = 0; i < this.myOptions.length; i++) {
      this.options.push({label: this.myOptions[i].libelle, value: this.myOptions[i].code});
    }

  }




  set editDialog(value: boolean) {
    this.inscriptionEtudiantService.editDialog = value;
  }
  set createDialog(value: boolean) {
    this.inscriptionEtudiantService.createDialog = value;
  }

  public edit(note: NoteEtudiantModule) {
    this.editDialog = true;

  }
  public openCreate() {
    this.createDialog = true;
  }


  SearchStudent() {
     this.inscriptionEtudiantService.SearchStudent();
  }

  get etudiantOption(): EtudiantOption {
    return this.inscriptionEtudiantService.etudiantOption;
  }

  get etudiantOptions(): Array<EtudiantOption> {
    return this.inscriptionEtudiantService.etudiantOptions;
  }

  set etudiantOption(value: EtudiantOption) {
    this.inscriptionEtudiantService.etudiantOption = value;
  }

    editEtudiant(etudiantOption: EtudiantOption) {
      this.etudiantOption={...etudiantOption};
      this.etudiantOption.etudiant = {...etudiantOption.etudiant};
      this.etudiantOption.semestre = {...etudiantOption.semestre};
      this.etudiantOption.myOption = {...etudiantOption.myOption};
      this.editDialog = true;
    }



}

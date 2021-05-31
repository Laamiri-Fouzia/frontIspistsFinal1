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
import {AnneeUniversitaireService} from "../../../controller/service/annee-universitaire.service";
import {AnneeUniversitaire} from "../../../controller/model/anneeUniversitaire";

@Component({
  selector: 'app-inscription-nouveau-etudiant',
  templateUrl: './inscription-nouveau-etudiant.component.html',
  styleUrls: ['./inscription-nouveau-etudiant.component.scss']
})
export class InscriptionNouveauEtudiantComponent implements OnInit {

  cols: any[];
  options: any[]=new Array();
  semestres: any[]=new Array();
  displayTable:boolean=false;
  constructor(private annéeUniversitaireService: AnneeUniversitaireService, private messageService: MessageService, private inscriptionEtudiantService:InscriptionEtudiantService, private filiereService:FiliereService, private confirmationService: ConfirmationService, private noteEtudiantModuleService:NoteEtudiantModuleService) {
    //anne ce que l'utilisateur voit et code ce qui est stocke


  }

  ngOnInit(): void {
    this.etudiantOption=null;
    this.filiereService.getAllOptions();
    this.options.push({label: 'Option :', value: null});
    this.annéeUniversitaireService.findAllyears();
  }



  private initCol() {
    this.cols = [
      {field: 'CNE', header: 'CNE'},
      {field: 'NOM', header: 'NOM'},
      {field: 'PRENOM', header: 'PRENOM'},
      {field: 'DATEn', header: 'DATEn'},
      {field: 'Action', header: 'Action'}
    ];
  }

  get years(): Array<AnneeUniversitaire> {
    return this.annéeUniversitaireService.years;
  }
  get myOptions(): Array<MyOption> {
    return this.filiereService.myOptions;
  }


  change1() {
    //const maDate: Date;
    for(let  i = 0; i < this.myOptions.length; i++) {
      this.options.push({label: this.myOptions[i].libelle, value: this.myOptions[i].code});
    }
    /*let maintenant = maDate.getDate() + '/' + ((maDate.getMonth() + 1)) + '/' + maDate.getFullYear()+ ' ' + maDate.getHours() + ':' + maDate.getMinutes()+ ':' + maDate.getSeconds());
    console.log(maintenant)*/

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
    this.displayTable=true;
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
  set etudiantOptions(value: Array<EtudiantOption>) {
    this.inscriptionEtudiantService.etudiantOptions = value;
  }

    editEtudiant(etudiantOption: EtudiantOption) {
      this.etudiantOption=this.inscriptionEtudiantService.clone(etudiantOption);
      this.editDialog = true;
      console.log(this.etudiantOption);
    }

  public delete(selected: EtudiantOption) {
    this.etudiantOption = selected;
    this.inscriptionEtudiantService.deleteEtudiantOption();
    this.etudiantOptions = this.etudiantOptions.filter(val => val.id !== this.etudiantOption.id);
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Etudiant bien supprimé',
      life: 3000
    });
    /*this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer ',
      header: 'Attention',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.inscriptionEtudiantService.deleteEtudiantOption();
          //this.etudiantOptions = this.etudiantOptions.filter(val => val.id !== this.etudiantOption.id);
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Etudiant bien supprimé',
            life: 3000
          });
      }
    });*/
  }
  get optSelec(): string {
    return this.inscriptionEtudiantService.optSelec;
  }
  set optSelec(value: string) {
    this.inscriptionEtudiantService.optSelec = value;
  }

  get anneselect(): number {
    return this.inscriptionEtudiantService.anneselect;
  }

  set anneselect(value: number) {
    this.inscriptionEtudiantService.anneselect = value;
  }

}

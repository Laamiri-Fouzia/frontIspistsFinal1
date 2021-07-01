import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Etudiant} from "../../../../controller/model/etudiant.model";
import {environment} from "../../../../../environments/environment";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AnneeUniversitaireService} from "../../../../controller/service/annee-universitaire.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {InscriptionEtudiantService} from "../../../../controller/service/inscription-etudiant.service";
import {FiliereService} from "../../../../controller/service/filiere.service";
import {NoteEtudiantModuleService} from "../../../../controller/service/note-etudiant-module.service";
import {Table} from "primeng/table";
import {AnneeUniversitaire} from "../../../../controller/model/anneeUniversitaire";
import {MyOption} from "../../../../controller/model/my-option.model";
import {EtudiantOption} from "../../../../controller/model/etudiant-option.model";
import * as moment from "moment";
import {Workbook} from "exceljs";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as fs from 'file-saver';
import {NoteEtudiantModule} from "../../../../controller/model/note-etudiant-module.model";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  displayTable:boolean=false;
  cols: any[];
  options: any[]=new Array();
  semestres: any[]=new Array();

  constructor(private router:Router,private messageService: MessageService, private annéeUniversitaireService: AnneeUniversitaireService, private inscriptionEtudiantService:InscriptionEtudiantService, private filiereService:FiliereService, private noteEtudiantModuleService:NoteEtudiantModuleService) {
    //anne ce que l'utilisateur voie et code ce qui est stocke

    this.semestres=[
      {label: "Semestre :", value: null},
      {label:  "Semestre 1",value: 1},
      {label: "Semestre 2", value: 2},
      {label: "Semestre 3", value: 3},
      {label: "Semestre 4", value: 4},
      {label: "Semestre 5", value: 5},
      {label: "Semestre 6", value: 6},
    ];

  }

  ngOnInit(): void {
    this.initCol()
    this.etudiantOption=new EtudiantOption();
    this.etudiantOptions=new Array<EtudiantOption>();
    this.filiereService.getAllOptions();
    this.options.push({label: 'Option :', value: null});
    this.annéeUniversitaireService.findAllyears();
  }
  downloadExcel() {

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('etudiants');//hnna mieux ndro smiya en detaille option ...
    worksheet.columns = [
      { header: 'Cne', key: 'cne', width: 25 },
      { header: 'Cin', key: 'cin', width: 25 },
      { header: 'Nom', key: 'nom', width: 25 },
      { header: 'Prenom', key: 'prenom', width: 25 },
      { header: 'Date de Naissance', key: 'datenaiss', width: 25 }
    ];
    this.etudiants.forEach(e => {
      worksheet.addRow({
        cne: e.cne,
        cin: e.cin,
        nom: e.nom,
        prenom: e.prenom ,
        datenaiss: e.dateNaissance
      }, 'n');
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Etudiants_S'+this.semestreForExcel+'_'+this.optionForExcel+'_'+this.anforEXcel+'.xlsx');
    });
  }
  private initCol() {
    this.cols = [
      {field: 'CNE', header: 'CNE'},
      {field: 'NOM', header: 'NOM'},
      {field: 'PRENOM', header: 'PRENOM'}

    ];
  }

  get myOptions(): Array<MyOption> {
    return this.filiereService.myOptions;
  }
  change1() {
    console.log(this.etudiantOption.anneeUniversitaire.anneeOne);
    for(let  i = 0; i < this.myOptions.length; i++) {
      this.options.push({label: this.myOptions[i].libelle, value: this.myOptions[i].code});
    }

  }

  get years(): Array<AnneeUniversitaire> {
    return this.annéeUniversitaireService.years;
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

  etudiants=new Array<Etudiant>();
  anforEXcel:string;
  optionForExcel:string;
  semestreForExcel:number;

  SearchAncienStudent() {
    this.etudiants=new Array<Etudiant>();
    this.displayTable=true;
    this.inscriptionEtudiantService.chercherEtudiantsN().subscribe(
        data => {
         this.anforEXcel=data[0].anneeUniversitaire.libelle;
         this.optionForExcel=data[0].myOption.libelle;
         this.semestreForExcel=data[0].semestre.code;
          console.log('date')
          console.log(data)
          for (let etudiant of data){
            this.etudiants.push(etudiant.etudiant);
          }
          console.log(this.etudiants);
        }, error => {
          console.log(error);
        }
    );
  }
  clear(table: Table) {
    table.clear();
  }
  set etudiantOption(value: EtudiantOption) {
    this.inscriptionEtudiantService.etudiantOption = value;
  }
  set etudiantOptions(value: Array<EtudiantOption>) {
    this.inscriptionEtudiantService.etudiantOptions = value;
  }
  get etudiantOption(): EtudiantOption {
    return this.inscriptionEtudiantService.etudiantOption;
  }

  get etudiantAnciens(): Array<EtudiantOption> {
    return this.inscriptionEtudiantService.etudiantAnciens;
  }


  set etudiantAnciens(value: Array<EtudiantOption>) {
    this.inscriptionEtudiantService.etudiantAnciens=value;
  }


  gotTo(viewEtudiant: string) {
    this.router.navigate([`${viewEtudiant}`]);
  }
}

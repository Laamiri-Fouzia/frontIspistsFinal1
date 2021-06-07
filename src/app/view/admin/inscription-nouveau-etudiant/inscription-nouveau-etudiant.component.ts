import {Component, OnInit, ViewChild,ElementRef} from '@angular/core';
import {FiliereService} from "../../../controller/service/filiere.service";
import {NoteEtudiantModuleService} from "../../../controller/service/note-etudiant-module.service";
import {MyOption} from "../../../controller/model/my-option.model";
import {NoteEtudiantModule} from "../../../controller/model/note-etudiant-module.model";
import {InscriptionEtudiantService} from "../../../controller/service/inscription-etudiant.service";
import {EtudiantOption} from "../../../controller/model/etudiant-option.model";
import {ConfirmationService, MessageService} from "primeng/api";
import {AnneeUniversitaireService} from "../../../controller/service/annee-universitaire.service";
import {AnneeUniversitaire} from "../../../controller/model/anneeUniversitaire";
import {Workbook} from "exceljs";
import html2canvas from 'html2canvas';
import * as fs from 'file-saver';
import jsPDF from 'jspdf';

import autoTable from "jspdf-autotable";

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
//import_export methode
  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {//un gestionnaire pour l'evenement abort (qui se declenche lorsque le chargement de donnee est annuler)

      const bstr: string = e.target.result;
      const data = <any[]>this.inscriptionEtudiantService.importFromFile(bstr);
      const header: string[] = Object.getOwnPropertyNames(new EtudiantOption());
      const x = data.slice(1);

      for (let i = 0; i < x.length; i++) {
        console.log(x[i]);
        for (let j = 0; j <= x[i].length; j++) {
          //console.log( x[i][j]);
          if (j == 0) {
            this.etudiantOption.etudiant.cne = x[i][j];
          } else if (j == 1){
            this.etudiantOption.etudiant.cin = x[i][j];
          } else if (j == 2){
            this.etudiantOption.etudiant.nom = x[i][j];
          } else if (j == 3) {
            this.etudiantOption.etudiant.prenom = x[i][j];

          } else if (j == 4) {
            this.etudiantOption.etudiant.dateNaissance = x[i][j];

          }
        }
        this.inscriptionEtudiantService.saveNewEtudiant();
      }

      /*this.etudiantOptions = importedData.map(arr => {
        const obj = {};
        for (let i = 0; i < header.length; i++) {
          const k = header[i];
          obj[k] = arr[i];
        }
        return <EtudiantOption>obj;
      })*/


    };
    reader.readAsBinaryString(target.files[0]);

  }




  private initCol() {
    this.cols = [

      {field: 'cne', header: 'cne'},
      {field: 'cin', header: 'cin'},
      {field: 'nom', header: 'nom'},
      {field: 'prenom', header: 'prenom'},
      {field: 'datenaiss', header: 'datenaiss'},

    ];
  }
  downloadExcel() {

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('etudiants');//hnna mieux ndro smiya en detaille option ...
    const annee=this.anneselect+1
    worksheet.columns = [
      { header: 'cne', key: 'cne', width: 10 },
      { header: 'cin', key: 'cin', width: 32 },
      { header: 'nom', key: 'nom', width: 10 },
      { header: 'prenom', key: 'prenom', width: 10 },
      { header: 'datenaiss', key: 'datenaiss', width: 10 }
    ];
    this.inscriptionEtudiantService.etudiantOptions.forEach(e => {
      worksheet.addRow({cne: e.etudiant.cne, cin: e.etudiant.cin, nom: e.etudiant.nom, prenom: e.etudiant.prenom ,datenaiss: e.etudiant.dateNaissance}, 'n');
    });
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Inscription_etudiants_S1_'+this.anneselect+'/'+annee+'_'+this.optSelec+'.xlsx');
    });
  }
  //pdf ici ri pour tester  @ViewChild('htmlData'):ElementRef
  @ViewChild('htmlData',{static : false}) htmlData:ElementRef;
  public openPDF(): void {
    const DATA = document.getElementById('htmlData');
    html2canvas(DATA).then(canvas => {
      const fileWidth = 208;
      const fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png');
      const PDF = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('tasssa.pdf');
    });
  }

  //@ViewChild('htmlData',{static : false}) el!:ElementRef
title ='test pdf ';
  /*makePDf(){
    let pdf = new jsPDF('p','pt','a4');
    //pdf.text("TITRE DE PDF",10,10);
    pdf.html(this.el.nativeElement,{
      callback:(pdf)=>{
        pdf.save("smia.pdf");
      }
    })

  }*/



  //auther essay pdf

  /*columns = [
    { title: "cne", dataKey: "cne" },
    { title: "cin", dataKey: "cin" },
    { title: "nom", dataKey: "nom" },
    { title: "prenom", dataKey: "prenom" },
    { title: "datenaiss", dataKey: "datenaiss" }
  ];
  exportPdf() {

    const doc = new jsPDF('p','pt');

    autoTable(doc, {
      columns: this.columns,
      body: this.etudiantOptions,
      didDrawPage: (dataArg) => {
        doc.text('smiya', dataArg.settings.margin.left, 10);
      }
    });
    doc.save('smiya.pdf');
  }*/


}

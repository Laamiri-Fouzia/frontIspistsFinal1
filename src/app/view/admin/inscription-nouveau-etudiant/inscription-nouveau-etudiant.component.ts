import { Component, OnInit } from '@angular/core';
import {FiliereService} from "../../../controller/service/filiere.service";
import {NoteEtudiantModuleService} from "../../../controller/service/note-etudiant-module.service";
import {MyOption} from "../../../controller/model/my-option.model";
import {NoteEtudiantModule} from "../../../controller/model/note-etudiant-module.model";;
import {InscriptionEtudiantService} from "../../../controller/service/inscription-etudiant.service";
import {EtudiantOption} from "../../../controller/model/etudiant-option.model";
import {ConfirmationService, MessageService} from "primeng/api";
import {AnnéeUniversitaireService} from "../../../controller/service/année-universitaire.service";
import {AnneeUniversitaire} from "../../../controller/model/anneeUniversitaire";
import * as FileSaver from 'file-saver';
import {Etudiant} from "../../../controller/model/etudiant.model";


@Component({
  selector: 'app-inscription-nouveau-etudiant',
  templateUrl: './inscription-nouveau-etudiant.component.html',
  styleUrls: ['./inscription-nouveau-etudiant.component.scss']
})
export class InscriptionNouveauEtudiantComponent implements OnInit {

  cols: any[];
  options: any[] = new Array();
  semestres: any[] = new Array();
  displayTable: boolean = false;

  constructor(private annéeUniversitaireService: AnnéeUniversitaireService, private messageService: MessageService, private inscriptionEtudiantService: InscriptionEtudiantService, private filiereService: FiliereService, private confirmationService: ConfirmationService, private noteEtudiantModuleService: NoteEtudiantModuleService) {
    //anne ce que l'utilisateur voit et code ce qui est stocke


  }


  get years(): Array<AnneeUniversitaire> {
    return this.annéeUniversitaireService.years;
  }

  get myOptions(): Array<MyOption> {
    return this.filiereService.myOptions;
  }


  change1() {
    //const maDate: Date;
    for (let i = 0; i < this.myOptions.length; i++) {
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
    this.displayTable = true;
    this.inscriptionEtudiantService.SearchStudent();
  }

  get etudiantOption(): EtudiantOption {
    return this.inscriptionEtudiantService.etudiantOption;
  }

  get etudiantOptions(): Array<EtudiantOption> {
    return this.inscriptionEtudiantService.etudiantOptions;
  }

  set etudiantOptions(value: Array<EtudiantOption>) {
    this.inscriptionEtudiantService.etudiantOptions = value;
  }

  get etudiants(): Array<Etudiant> {
    return this.inscriptionEtudiantService.etudiants;
  }

  set etudiants(value: Array<Etudiant>) {
    this.inscriptionEtudiantService.etudiants = value;
  }

  set etudiantOption(value: EtudiantOption) {
    this.inscriptionEtudiantService.etudiantOption = value;
  }


  editEtudiant(etudiantOption: EtudiantOption) {
    this.etudiantOption = this.inscriptionEtudiantService.clone(etudiantOption);
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

  //etudiantOptions1: EtudiantOption[] = [];
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
          } else if (j == 1) {
            this.etudiantOption.etudiant.cin = x[i][j];
          } else if (j == 2) {
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

  otherTry(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      const bstr: string = e.target.resul
      const data = <any[]>this.inscriptionEtudiantService.importFromFile(bstr);

      const header: string[] = Object.getOwnPropertyNames(new EtudiantOption());//ta tl9a smiyatt t lheader mkhtalfn mais tat3tihom dakxi li 3ndek nta
      const x = data.slice(1);

      this.etudiantOptions = x.map(arr => {
        const obj = {};
        for (let i = 0; i < header.length; i++) {
          const k = header[i];
          obj[k] = arr[i];
          for (let j = 0; j <= header[i].length; j++) {
            //console.log( x[i][j]);
            if (j == 0) {
              this.etudiantOption.etudiant.cne = header[i][j];
            } else if (j == 1) {
              this.etudiantOption.etudiant.cin = header[i][j];
            } else if (j == 2) {
              this.etudiantOption.etudiant.nom = header[i][j];
            } else if (j == 3) {
              this.etudiantOption.etudiant.prenom = header[i][j];

            }
            this.inscriptionEtudiantService.saveNewEtudiant();

          }
        }
        return <EtudiantOption>obj;
      })

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

  //les exports

  exportColumns: any[];

  ngOnInit(): void {
    this.initCol();
    this.etudiantOption = null;
    this.filiereService.getAllOptions();
    this.options.push({label: 'Option :', value: null});
    this.annéeUniversitaireService.findAllyears();
    //this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.etudiantOptions);
      const workbook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
      const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
      this.saveAsExcelFile(excelBuffer, "Inscription_etudaints_s1");//hnna nzido option li m selectia o annee
    });
  }


  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);//    FileSaver.saveAs(data, fileName +this.anneselect+this.optSelec+ '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  testExport() {
    this.inscriptionEtudiantService.testExport().subscribe(x => {
      const blob = new Blob([x], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'})

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob);
        return;
      }
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
      setTimeout(function () {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);

    });
  }

}






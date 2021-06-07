import {Component, OnInit, ViewChild,ElementRef} from '@angular/core';
import {NoteEtudiantModule} from "../../../controller/model/note-etudiant-module.model";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {NoteEtudiantSemestreService} from "../../../controller/service/note-etudiant-semestre.service";
import {Etudiant} from "../../../controller/model/etudiant.model";


@Component({
  selector: 'app-note-semestre-one',
  templateUrl: './note-semestre-one.component.html',
  styleUrls: ['./note-semestre-one.component.scss']
})
export class NoteSemestreOneComponent implements OnInit {
  semestres:any[];
  input1;
  input2;
  public _notes:Array<any>=new Array<any>();
  constructor(private noteEtudiantSemestreService:NoteEtudiantSemestreService) {
    this.semestres=[
      {label: "Semestre :", value: null},
      {label: "Semestre 1", value: 1},
      {label: "Semestre 2", value: 2},
      {label: "Semestre 3",value: 3},
      {label: "Semestre 4",value: 4},
      {label: "Semestre 5", value: 5},
      {label: "Semestre 6", value: 6}
    ];
  }



  ngOnInit(): void {
  }



  //pdf ici ri pour tester  @ViewChild('htmlData'):ElementRef
  @ViewChild('htmlData',{static : false}) htmlData:ElementRef;
  public openPDF():void {
    let DATA = document.getElementById('htmlData');

    html2canvas(DATA).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save('PV_Semestre');
    });
  }

 //hada etudiant
  get semestreSelct(): number {
    return this.noteEtudiantSemestreService.semestreSelct;
  }

  set semestreSelct(value: number) {
    this.noteEtudiantSemestreService.semestreSelct = value;
  }
  get etudiant(): Etudiant {
    return this.noteEtudiantSemestreService.etudiant;
  }
  get notesEtudiantModules(): Array<NoteEtudiantModule> {
    return this.noteEtudiantSemestreService.notesEtudiantModules;
  }
  get submitted(): boolean {
    return this.noteEtudiantSemestreService.submitted;
  }

  set submitted(value: boolean) {
    this.noteEtudiantSemestreService.submitted = value;
  }

  set notesEtudiantModules(value: Array<NoteEtudiantModule>) {
    this.noteEtudiantSemestreService.notesEtudiantModules = value;
  }
  get notesEtudiantModules1(): Array<NoteEtudiantModule> {
    return this.noteEtudiantSemestreService.notesEtudiantModules1;
  }

  set notesEtudiantModules1(value: Array<NoteEtudiantModule>) {
    this.noteEtudiantSemestreService.notesEtudiantModules1 = value;
  }
  get notesEtudiantModules2(): Array<NoteEtudiantModule> {
    return this.noteEtudiantSemestreService.notesEtudiantModules2;
  }

  set notesEtudiantModules2(value: Array<NoteEtudiantModule>) {
    this.noteEtudiantSemestreService.notesEtudiantModules2 = value;
  }


  change2() {
    this.semestreSelct=this.input2;
  }

  afficherPV(input1:string, input2:number) {
    this.noteEtudiantSemestreService.afficherPV(input1,input2);

    for(let  i = 0; i < this.notesEtudiantModules.length; i++) {
      this._notes.push({
        nom: this.notesEtudiantModules[i].etudiant.nom,
        prenom: this.notesEtudiantModules[i].etudiant.prenom,
        noteSemestre: this.notesEtudiantModules[i].noteEtudiantSemestre.noteSemestre,
        libelleModule: this.notesEtudiantModules[i].moduleSemestreOption.myModule.libelle,
        noteModule: this.notesEtudiantModules[i].noteGlobale,
        etatModule: this.notesEtudiantModules[i].etatValidation.libelle,
        etatSemestre: this.notesEtudiantModules[i].noteEtudiantSemestre.etatValidation.libelle,
        annee: this.notesEtudiantModules[i].moduleSemestreOption.anneeUniversitaire.libelle,
      });
      console.log('hada notes' )
      console.log(this._notes)
    }


  }
}

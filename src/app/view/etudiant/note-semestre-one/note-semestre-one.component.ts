import {Component, OnInit, ViewChild,ElementRef} from '@angular/core';
import {NoteEtudiantModule} from "../../../controller/model/note-etudiant-module.model";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {NoteEtudiantSemestreService} from "../../../controller/service/note-etudiant-semestre.service";


@Component({
  selector: 'app-note-semestre-one',
  templateUrl: './note-semestre-one.component.html',
  styleUrls: ['./note-semestre-one.component.scss']
})
export class NoteSemestreOneComponent implements OnInit {
  constructor(private noteEtudiantSemestreService:NoteEtudiantSemestreService) { }

  ngOnInit(): void {
  }

  get semestreSelct(): number {
    return this.noteEtudiantSemestreService.semestreSelct;
  }

  set semestreSelct(value: number) {
    this.noteEtudiantSemestreService.semestreSelct = value;
  }
  get notesEtudiantModules(): Array<NoteEtudiantModule> {
    return this.noteEtudiantSemestreService.notesEtudiantModules;
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



}

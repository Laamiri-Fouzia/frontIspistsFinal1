import { Component, OnInit } from '@angular/core';
import {NoteEtudiantSemestreService} from "../../controller/service/note-etudiant-semestre.service";
import {NoteEtudiantModule} from "../../controller/model/note-etudiant-module.model";
import {Etudiant} from "../../controller/model/etudiant.model";

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.scss']
})
export class EtudiantComponent implements OnInit {


  constructor(private noteEtudiantSemestreService:NoteEtudiantSemestreService) {

  }

  ngOnInit(): void {
  }

}

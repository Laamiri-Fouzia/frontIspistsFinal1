import { Component, OnInit } from '@angular/core';
import {NoteEtudiantModuleService} from "../../../../controller/service/note-etudiant-module.service";
import {MessageService} from "primeng/api";
import {NoteEtudiantModule} from "../../../../controller/model/note-etudiant-module.model";
import {InscriptionEtudiantService} from "../../../../controller/service/inscription-etudiant.service";
import {EtudiantOption} from "../../../../controller/model/etudiant-option.model";
import {AnneeUniversitaireService} from "../../../../controller/service/annee-universitaire.service";
import {AnneeUniversitaire} from "../../../../controller/model/anneeUniversitaire";

@Component({
  selector: 'app-inscription-nouveau-edit',
  templateUrl: './inscription-nouveau-edit.component.html',
  styleUrls: ['./inscription-nouveau-edit.component.scss']
})
export class InscriptionNouveauEditComponent implements OnInit {

  constructor(private inscriptionEtudiantService:InscriptionEtudiantService, private annéeUniversitaireService: AnneeUniversitaireService , private messageService: MessageService) { }

  ngOnInit(): void {

  }
  get editDialog(): boolean {
    return this.inscriptionEtudiantService.editDialog;
  }

  set editDialog(value: boolean) {
    this.inscriptionEtudiantService.editDialog = value;
  }


  public findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.etudiantOptions.length; i++) {
      if (this.etudiantOptions[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }
  get years(): Array<AnneeUniversitaire> {
    return this.annéeUniversitaireService.years;
  }

  EditStudent() {
    if (this.etudiantOption.id) {
      this.etudiantOptions[this.findIndexById(this.etudiantOption.id)] =this.etudiantOption;
    }
    this.inscriptionEtudiantService.EditStudent();
    this.editDialog = false;
  }


  public hideEditDialog() {
    this.editDialog = false;
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

}

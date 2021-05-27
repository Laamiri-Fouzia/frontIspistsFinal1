import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {FiliereService} from "../../../../controller/service/filiere.service";
import {Filiere} from "../../../../controller/model/filiere.model";

@Component({
  selector: 'app-filiere-create',
  templateUrl: './filiere-create.component.html',
  styleUrls: ['./filiere-create.component.scss']
})
export class FiliereCreateComponent implements OnInit {

  constructor(private messageService: MessageService, private service: FiliereService) {
  }

  ngOnInit(): void {
  }

  public hideCreateDialog() {
    this.createDialog = false;
    this.submitted = false;
  }

  public save() {
    this.submitted = true;
    if (this.filiere.code.trim()) {
      this.service.save().subscribe(data => {
        this.filieres.push({...data});//au lieu de clonne
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'la filiere est crée',
          life: 3000
        });
      });
      this.createDialog = true;
      this.filiere = new Filiere();
    }
  }
  get filiere(): Filiere {
    return this.service.filiere;
  }
  set filiere(value: Filiere) {
    this.service.filiere =value;
  }

  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }

  get submitted(): boolean {
    return this.service.submitted;
  }

  set submitted(value: boolean) {
    this.service.submitted = value;
  }

  get filieres(): Array<Filiere> {
    return this.service.filieres;
  }
  set filieres(value: Array<Filiere>) {
    this.service.filieres = value;
  }

}
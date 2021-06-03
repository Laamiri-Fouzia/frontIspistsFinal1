import { Component, OnInit } from '@angular/core';
import {Seance} from "../../../../controller/model/seance.model";
import {ModuleSemestreOptionService} from "../../../../controller/service/module-semestre-option.service";
import {SeanceService} from "../../../../controller/service/seance.service";

@Component({
  selector: 'app-seance-list',
  templateUrl: './seance-list.component.html',
  styleUrls: ['./seance-list.component.scss']
})
export class SeanceListComponent implements OnInit {

  constructor(private seanceService:SeanceService,private moduleSemestreOptionService:ModuleSemestreOptionService) { }

  ngOnInit(): void {
  }
  get seances(): Array<Seance> {
    return this.seanceService.seances;
  }

  set seances(value: Array<Seance>) {
    this.seanceService.seances = value;
  }

  get seance(): Seance {
    return this.seanceService.seance;
  }

  set seance(value: Seance) {
    this.seanceService.seance = value;
  }
  get createDialog(): boolean {
    return this.seanceService.createDialog;
  }

  set createDialog(value: boolean) {
    this.seanceService.createDialog = value;
  }

  get editDialog(): boolean {
    return this.seanceService.editDialog;
  }

  set editDialog(value: boolean) {
    this.seanceService.editDialog = value;
  }

  get viewDialog(): boolean {
    return this.seanceService.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.seanceService.viewDialog = value;
  }

  get submitted(): boolean {
    return this.seanceService.submitted;
  }

  set submitted(value: boolean) {
    this.seanceService.submitted = value;
  }

  openCreate() {
    this.submitted = false;
    this.createDialog = true;
  }
}

import { Component, OnInit } from '@angular/core';
import {AbsenceService} from "../../../controller/service/absence.service";

@Component({
  selector: 'app-absence-edit',
  templateUrl: './absence-edit.component.html',
  styleUrls: ['./absence-edit.component.scss']
})
export class AbsenceEditComponent implements OnInit {

  constructor(private absenceService:AbsenceService) { }

  ngOnInit(): void {
  }
  get editDialog(): boolean {
    return this.absenceService.editDialog;
  }

  set editDialog(value: boolean) {
    this.absenceService.editDialog = value;
  }
    choisirParametre() {
       this.absenceService.editDialog=true;
    }
}

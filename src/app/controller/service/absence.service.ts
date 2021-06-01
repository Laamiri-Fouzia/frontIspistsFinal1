import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  private _editDialog:boolean=false;
  constructor() { }

  get editDialog(): boolean {
    return this._editDialog;
  }

  set editDialog(value: boolean) {
    this._editDialog = value;
  }
}

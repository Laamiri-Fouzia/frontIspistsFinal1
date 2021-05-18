import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {FiliereService} from "../../../../controller/service/filiere.service";
import {Filiere} from "../../../../controller/model/filiere.model";
import {MyOption} from "../../../../controller/model/my-option.model";

@Component({
  selector: 'app-my-option-liste',
  templateUrl: './my-option-liste.component.html',
  styleUrls: ['./my-option-liste.component.scss']
})
export class MyOptionListeComponent implements OnInit {

  cols: any[];

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
              private service: FiliereService) {
  }

  ngOnInit(): void {
    this.service.getAllOptions();
  }

  /*public delete(filiere: Filiere) {
    this.filiere = filiere;
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer ' + filiere.code + '?',
      header: 'Attention',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteByCode().subscribe(data => {
          this.filieres = this.filieres.filter(val => val.id !== this.filiere.id);
          this.filiere = new Filiere();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'la filière est supprimé',
            life: 2000
          });
        });
      }
    });
  }*/

  public openCreate() {
    this.myOption = new MyOption();
    this.submitted = false;
    this.createDialog = true;
  }

  public edit(filiere: Filiere) {
    this.myOption = {...this.myOption};
    this.editDialog = true;
  }


  /*private initCol() {
    this.cols = [
      {field: 'id', header: 'Id'},
      {field: 'code', header: 'Code'},
      {field: 'libelle', header: 'Libelle'}

    ];
  }*/

  get myOption(): MyOption {
    return this.service.myOption;
  }
  set myOption(value: MyOption) {
    this.service.myOption =value;
  }

  get myOptions(): Array<MyOption> {
    return this.service.myOptions;
  }
  set myOptions(value: Array<MyOption>) {
    this.service.myOptions = value;
  }


  get submitted(): boolean {
    return this.service.submitted;
  }

  set submitted(value: boolean) {
    this.service.submitted = value;
  }

  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }

  get editDialog(): boolean {
    return this.service.editDialog;
  }

  set editDialog(value: boolean) {
    this.service.editDialog = value;
  }

  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }


  /*choisirParam(myOption: MyOption) {
    this.moduleSemestreOptionService.choisirParam(myOption);
  }*/
}

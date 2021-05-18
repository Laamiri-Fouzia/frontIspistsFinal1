import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {FiliereService} from "../../../../controller/service/filiere.service";
import {Filiere} from "../../../../controller/model/filiere.model";
import {MyOption} from "../../../../controller/model/my-option.model";

@Component({
  selector: 'app-my-option-create',
  templateUrl: './my-option-create.component.html',
  styleUrls: ['./my-option-create.component.scss']
})
export class MyOptionCreateComponent implements OnInit {
  constructor(private messageService: MessageService, private service: FiliereService) {
  }

  inputValue1='';
  inputValue2='';
  ngOnInit(): void {
  }

  public hideCreateDialog() {
    this.createDialog = false;
    this.submitted = false;
  }


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


  saveOption(input1:string,input2:string) {
    this.service.saveOption(input1,input2);
  }
}

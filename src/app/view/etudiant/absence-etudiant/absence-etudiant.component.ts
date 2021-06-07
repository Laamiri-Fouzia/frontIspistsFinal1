import { Component, OnInit } from '@angular/core';
import {AnneeUniversitaire} from "../../../controller/model/anneeUniversitaire";
import {AnneeUniversitaireService} from "../../../controller/service/annee-universitaire.service";
import {AbsenceService} from "../../../controller/service/absence.service";
import {Absence} from "../../../controller/model/absence.model";
import {HttpClient} from "@angular/common/http";
import {ImageModl} from "../../../controller/model/image-modl.model";

@Component({
  selector: 'app-absence-etudiant',
  templateUrl: './absence-etudiant.component.html',
  styleUrls: ['./absence-etudiant.component.scss']
})
export class AbsenceEtudiantComponent implements OnInit {
  annee: string;
  semstre: string;
  semestres: any[]=new Array();
  cne: string;
  imageName: any;
  message: string;

  constructor(private annéeUniversitaireService: AnneeUniversitaireService,private absenceService:AbsenceService,private httpClient: HttpClient) {
    this.semestres=[
      {label: "Semestre :", value: null},
      {label: "Semestre 1", value: 1},
      {label: "Semestre 2", value: 2},
      {label:  "Semestre 3",value: 3},
      {label:  "Semestre 4",value: 4},
      {label: "Semestre 5", value: 5},
      {label: "Semestre 6", value: 6}
    ];
  }

  ngOnInit(): void {
    this.annéeUniversitaireService.findAllyears();
  }

  get absences(): Array<Absence> {
    return this.absenceService.absences;
  }

  get years(): Array<AnneeUniversitaire> {
    return this.annéeUniversitaireService.years;
  }

  searchAbsence(annee: string, semstre: string, cne: string) {
      this.absenceService.searchAbsence(annee, semstre, cne)
  }
  //for images
  selectedFile: File;

  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  onUpload(absence:Absence) {

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    //Make a call to the Spring Boot Application to save the image
    let nameData=this.selectedFile.name+absence.seance.libelle+absence.etudiant.cne;
    this.httpClient.post('http://localhost:8036/ispits-project/image/upload/nameData/'+nameData, uploadImageData, { observe: 'response' })
        .subscribe(
            data => {
              console.log('dkhlt l data ')
              console.log(absence)
              console.log(nameData)
              if(absence.imageModel==null)
                absence.imageModel=new ImageModl();
              absence.imageModel.nameData=nameData;
              this.absenceService.updateAbsence(absence);
            },error => {
              console.log(error);
            }
        );

  }


}

import { Etudiant } from "./etudiant.model";
import {Semestre} from "./semestre.model";
import {MyOption} from "./my-option.model";
import {AnneeUniversitaire} from "./anneeUniversitaire";

export class EtudiantOption {
  public id:number;
  public etudiant: Etudiant=new Etudiant() ;
  public myOption: MyOption=new MyOption();
  public semestre: Semestre=new Semestre();
  public anneeUniversitaire: AnneeUniversitaire=new AnneeUniversitaire();
 }

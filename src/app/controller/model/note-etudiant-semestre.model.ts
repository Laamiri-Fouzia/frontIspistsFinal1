import {Semestre} from "./semestre.model";
import {Etudiant} from "./etudiant.model";
import {EtatValidation} from "./etat-validation.model";

export class NoteEtudiantSemestre {
  public semetre:Semestre;
  public etudiant:Etudiant;
  public note:number;
  public etatValidation:EtatValidation;
}

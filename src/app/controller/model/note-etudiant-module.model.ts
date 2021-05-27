import {Etudiant} from "./etudiant.model";
import {EtatValidation} from "./etat-validation.model";
import {ModuleSemestreOption} from "./module-semestre-option.model";
import {NoteEtudiantSemestre} from "./note-etudiant-semestre.model";

export class NoteEtudiantModule {
  public etudiant:Etudiant=new Etudiant();
  public id:number;
  public moduleSemestreOption:ModuleSemestreOption=new ModuleSemestreOption();
  public noteEtudiantSemestre:NoteEtudiantSemestre=new NoteEtudiantSemestre();
  public noteContinue : number;
  public noteFinalAvRat : number;
  public noteFinalApresRat : number;
  public noteModuleNormal : number;
  public noteModuleRat : number;
  public noteGlobale : number;
  public etatValidation:EtatValidation=new EtatValidation();

}

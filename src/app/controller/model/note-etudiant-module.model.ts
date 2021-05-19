import {Etudiant} from "./etudiant.model";
import {MyModule} from "./MyModule.model";
import {EtatValidation} from "./etat-validation.model";

export class NoteEtudiantModule {
  public etudiant:Etudiant=new Etudiant();
  //public moduleSemestreOption:ModuleSemestreOption=new ModuleSemestreOption();
  public noteContinue : number;
  public noteFinalAvRat : number;
  public noteFinalApresRat : number;
  public noteModuleNormal : number;
  public noteModuleRat : number;
  public noteGlobale : number;
  public etatValidation:EtatValidation=new EtatValidation();

}

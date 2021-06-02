import {ModuleSemestreOption} from "./module-semestre-option.model";
import {Etudiant} from "./etudiant.model";

export class InscriptionEtudiantModule {
    public moduleSemestreOption:ModuleSemestreOption=new ModuleSemestreOption();
    public etudiant:Etudiant=new Etudiant();
    public code:string;
}

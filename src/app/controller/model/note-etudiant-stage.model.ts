import {Etudiant} from "./etudiant.model";
import {ModuleSemestreOption} from "./module-semestre-option.model";
import {NoteEtudiantSemestre} from "./note-etudiant-semestre.model";
import {EtatValidation} from "./etat-validation.model";

export class NoteEtudiantStage {
    public etudiant:Etudiant=new Etudiant();
    public id:number;
    public moduleSemestreOption:ModuleSemestreOption=new ModuleSemestreOption();
    public noteEtudiantSemestre:NoteEtudiantSemestre=new NoteEtudiantSemestre();
    public noteStage : number;
    public etatValidation:EtatValidation=new EtatValidation();
}

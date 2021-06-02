import {ModuleSemestreOption} from "./module-semestre-option.model";
import {Time} from "@angular/common";

export class Seance {
    public libelle:string;
    public heurDebut:string;
    public heurFin:string;
    public dateSeance:Date=new Date();
    public moduleSemestreOption:ModuleSemestreOption=new ModuleSemestreOption();

}

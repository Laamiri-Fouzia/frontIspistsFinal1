import {ModuleSemestreOption} from "./module-semestre-option.model";

export class Seance {
    public moduleSemestreOption:ModuleSemestreOption=new ModuleSemestreOption();
    public heureDebut:Date;
    public heureFin:Date;
    public dateSeance:Date;
    public libelle:string;
}

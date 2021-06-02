import {Etudiant} from "./etudiant.model";
import {Seance} from "./seance.model";

export class Absence {
    public etudiant:Etudiant=new Etudiant();
    public seance:Seance=new Seance();
    public etatJustification:boolean;
    public etatAbsence:boolean;
}

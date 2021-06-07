import {Etudiant} from "./etudiant.model";
import {Seance} from "./seance.model";

export class Absence {
    public id:number;
    public etudiant:Etudiant=new Etudiant();
    public seance:Seance=new Seance();
    public etatJustification:string;//accep ou nn
    public etatAbsence:boolean;//justifi ou nn
}

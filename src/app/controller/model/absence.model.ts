import {Etudiant} from "./etudiant.model";
import {Seance} from "./seance.model";
import {ImageModl} from "./image-modl.model";

export class Absence {
    public etudiant:Etudiant=new Etudiant();
    public seance:Seance=new Seance();
    public etatJustification:string;
    public etatAbsence:boolean;
    public imageModel:ImageModl=new ImageModl();

}

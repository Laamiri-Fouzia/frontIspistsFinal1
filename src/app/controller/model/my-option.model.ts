import {Filiere} from "./filiere.model";

export class MyOption {
    public code: string;
    public libelle: string;
    public coefContinue:number;
    public id:number;
    public coefFinale:number;
    public filliere:Filiere=new Filiere();
}

import {MyModule} from "./MyModule.model";

export class Professeur {
  public prenom:string;
  public nom:string;
  public cin:string;
  public codeEmploye:string;
  public login:string;
  public passWord:string;
  public mail:string;
  public tel:string;
  public dateEmbauche:string;
  public dateNaissance:string;
  public estCoordonateurModule:boolean;
  public isCoordonateurOption:boolean;
  public listeModules=new Array<MyModule>();
}

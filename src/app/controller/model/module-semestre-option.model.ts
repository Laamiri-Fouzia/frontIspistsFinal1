import {Semestre} from "./semestre.model";
import {TypeModule} from "./type-module.model";
import {MyOption} from "./my-option.model";
import {MyModule} from "./myModule.model";

export class ModuleSemestreOption {
    public code:string;
    public anneeUnvers: string;
    public semestre:Semestre=new Semestre();
    public myOption:MyOption=new MyOption();
    public myModule:MyModule=new MyModule();
    public typeModule:TypeModule=new TypeModule();
}


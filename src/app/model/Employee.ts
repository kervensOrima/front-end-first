import { Phones } from "./Phones";
import { Adresses } from "./Adresses";


export class Employee  {

    constructor(
       public id:number ,
       public code:string ,
       public nom:string ,
       public prenom:string , 
       public salaire:number , 
       public contrat_actuelle:boolean ,
       public typeContrat:string ,
       public dateEmbauche:Date ,
       public etat:string ,
       public adresses?:Adresses[]  ,
       public phones?:Phones[]) {}

}
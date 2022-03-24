import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Employee } from '../model/Employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  employee!:Employee  ;

  myForm!: FormGroup;
  constructor( private formBuilder :FormBuilder , private empService:EmployeeService ) { }

  ngOnInit(): void {

    //call initForm
    this.initForm() ;
  }

  initForm() {

    this.myForm = this.formBuilder.group(
      {
        nom: [ null , [ Validators.required , Validators.maxLength(30) , Validators.minLength(3)]] ,
        prenom : [ null , [ Validators.required , Validators.maxLength(30) , Validators.minLength(3)] ] ,
        salaire : [ null , [ Validators.required , Validators.min(1) , Validators.max(100000000) ] ],
        typeContrat : [ null , [ Validators.required ] ] ,
        contrat_actuelle : [ false ] ,
        etat : [ false] ,
        phones :this.formBuilder.array( [ this.phones() ]) ,
        adresses : this.formBuilder.array( [ this.adresses() ])
      }
    ) ;
  }

  //retourne un adresses group qui contient les differents proprietes
  adresses() {
   return this.formBuilder.group(
    {
      id:[ null , [ ]  ] ,
      rue:[  null , [ Validators.required , Validators.maxLength(30) , Validators.minLength(3)] ] ,
      ville:[  null , [ Validators.required , Validators.maxLength(30) , Validators.minLength(3) ] ] ,
      codePostal :[ null , [ Validators.required  , Validators.maxLength(5) , Validators.minLength(5)  ]]
    }
   )
  }

  //ajouter un nouveau phone
  addNewPhone() {
    this.phonesArray.push(  this.phones() )
  }



  //ajouter une nouvelle adresse
  addNewAdress() {
    this.adressesArray.push( this.adresses() )
  }

  //remove a phone form
  removePhone( index : number) {
    this.phonesArray.removeAt( index ) ;
  }
 
  //remove a adresse form
  removeAdresse( index :number){
    this.adressesArray.removeAt(index) ;
  }

  //Retourne tous les adresses
  get adressesArray() {
    return <FormArray> this.myForm?.get( 'adresses' ) ;
  }

  get phonesArray() {
    return <FormArray> this.myForm?.get( 'phones' )
  }

  //retourne un phone group qui contient les differents proprietes
  phones() {
    return this.formBuilder.group(
      {
        id:[ null , []] ,
        phone: [ null , [ Validators.required , Validators.pattern( '^[0-9]{8}$') , Validators.minLength(8) , Validators.maxLength(15) ]]
      }
    )
  }

  onSubmit(){

    // console.log(    this.myForm ) 

    const nom = this.myForm?.get('nom')?.value
    const prenom = this.myForm?.get('prenom')?.value;
    const salaire = this.myForm?.get('salaire')?.value ;
    const contrat_actuelle = this.myForm?.get('contrat_actuelle')?.value;
    const typeContrat = this.myForm?.get('typeContrat')?.value;

    console.log( ' Etat => ' + this.myForm?.value['etat']  ? 'actif' : 'inactif' ) 

    this.employee = new Employee( 0 , 'John Doe' , nom ,prenom , salaire  , contrat_actuelle ,
       typeContrat , new Date() , this.myForm?.value['etat'] ? 'actif' : 'inactif' , 
       this.myForm?.get('adresses')?.value ?? []  , this.myForm?.get('phones')?.value ?? []  ) ;

    this.empService.saveEmployee( this.employee ) 
    .subscribe(
      ( response : Employee ) =>{
        // console.log( response )
        
        Swal.fire( 'Save' , 'Employee save successfully ' , 'success' )
        this.myForm.reset() ;
      } ,
      ( error ) =>{
        Swal.fire( 'Error' , 'Error width register employee' , 'error' )
        console.log( error )
      } ,
      () =>{
        console.log( 'successfully  save ')
      }
    )
    
  }

  onReset(){
    this.myForm?.reset() ;
  }

}

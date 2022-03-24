import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/Employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dtOptions:DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 10,
    paging:true,
    responsive:true,
    processing: true,
  }

  value:string='etat' ;

  etat :boolean = true; // actif par defaut

  typeContrat:boolean = true ; // CDD pard defaut

  contrat:boolean = true; // qui ont un contrat par defaut

  employees:Employee[] =[] ;

  constructor(private empService : EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees('actif') ;
  }

  getEmployeeBy( param:string) {

   switch( param ){

     case 'etat' :{
      this.value ='etat' ;

        if( this.etat ) {
          this.etat = false
          this.getEmployees( 'inactif' );

        }else {
          this.etat = true
          this.getEmployees( 'actif' );
        }
        // console.log( this.etat ) ;
        // console.log( this.employees ) ;

     }break ;

     case 'contrat' :{
       this.value ='contrat'
        if( this.typeContrat  ){
          this.typeContrat = false
          this.getEmployeesByTypeContrat('CDI')
        }else{
          this.typeContrat = true
          this.getEmployeesByTypeContrat('CDD')
        }
        // console.log( this.typeContrat ) ;
        // console.log( this.employees ) ;

     }break ;

     case 'noContrat' :{
      this.value ='noContrat'

      if( this.contrat ) {
        this.getEmployeesNoContainContrat( this.contrat  )
        this.contrat = false ;
      }else{
        this.getEmployeesNoContainContrat( this.contrat )
        this.contrat = true
      }
      console.log( 'contrat value is ' + this.contrat ) ;
      // this.getEmployees( this.etat );
      // console.log( this.employees ) ;
     }break ;
   }
  }

  getEmployees(param:any ) {
    this.empService.getEmployeesByEtat( param )
    .subscribe(
      ( employees:Employee[] ) => {
        this.employees = employees; 

        console.log( this.employees )
      } ,
      ( error ) => {
        console.log( error )
      } ,
      () =>{
        console.log( 'Employee load successfully!!!' )
      }
    )
  }

  getEmployeesByTypeContrat(value:string) {
    this.empService.getEmployeesByTypeContrat(value) 
    .subscribe(
      ( response:Employee[]) =>{
        this.employees = response
      } ,
      (error) => {
        console.log( error )
      } ,
      ()=>{
        console.log( 'Successfully load')
      }
    )
  }

  getEmployeesNoContainContrat(value:boolean) {
    this.empService.getEmployeesNoContainContrat(value) 
    .subscribe(
      ( response:Employee[]) =>{
        this.employees = response
        console.log( ...this.employees )
      } ,
      (error) => {
        console.log( error )
      } ,
      ()=>{
        console.log( 'Successfully load')
      }
    )
  }


  



}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Employee } from '../model/Employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit , OnDestroy {

  constructor( public empService:EmployeeService , private router : Router) { }

  employees:Employee[] = [];

  dtOptions:DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 10,
    paging:true,
    responsive:true,
    processing: true,
  }

  ngOnInit(): void {

   
    //call all employees
    this.getEmployees() ;

  }


  getEmployees():void{
     this.empService.getEmployees() 
     .subscribe(
       ( employees:Employee[] ) => {
         this.employees = employees ;
        //  console.log( this.employees )
       } ,
       ( error ) => {
         console.log( error )
       } ,
       ( ) => {
         console.log( 'Employees load in the api successfully!!!')
       }
     )
  }


  deleteEmployee(id:number){
    console.log( id )

    Swal.fire({
      title :'Are you sure to delete?' ,
      text :'Processus inarretable!!!' ,
      icon : 'question' ,
      showCancelButton : true ,
      confirmButtonText: 'Yes, delete it' ,
      cancelButtonText :'No, cancel! ' ,
      customClass: {
        confirmButton: 'btn btn-success btn-sm m-2',
        cancelButton: 'btn btn-danger btn-sm m-2',
      },
      buttonsStyling: false
    })
    .then( 
      (value) =>{

        console.log( value )
        if( value.isConfirmed ) {

          this.empService.deleteEmployee( id ) 
          .subscribe(
            (response:any) => {
              console.log( response ) ;
              this.getEmployees() ;
            } ,
            (error) =>{
              console.log( error ) ;
            } ,
            () => {
              console.log( 'Employee delete successfully!!!')
            }
          )
          Swal.fire(
            'Deleted' ,
            'Employee has been delete successfully!' ,
            'success'
          )
        
        }
        else 
        {
          Swal.fire(
            'Cancelled' ,
            'Operation cancelled' ,
            'error'
          )
        }
      }
    )
  }


  employeeInfo( id : number ) {
    this.router.navigate( ['/employee-view/' , id ])
  }

  getEmployee( id :number ) {
    this.router.navigate( ['/employee-form/' , id ])
  }

  ngOnDestroy(): void {
    
  }

}

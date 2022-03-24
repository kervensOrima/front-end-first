import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../model/Employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.scss']
})
export class EmployeeViewComponent implements OnInit {

  employee!:Employee ;

  constructor( 
    private activatedRoute:ActivatedRoute , 
    private empService :EmployeeService 
  ) { }

  ngOnInit(): void {

    const id =  +this.activatedRoute.snapshot.params['id'] ;
    console.log( ' employee id : ' + id )
    this.getEmployee( id ) ;
  }


  getEmployee( id : number ) {

    this.empService.getEmployeeById( id )
    .subscribe(
      ( employee: Employee) => {
        this.employee = employee 

        console.log( this.employee )
      } ,
      (error) =>{
        console.log( error )
      } ,
      () =>{
        console.log( 'Employee successfully get by id!!!s')
      }
    )
  }
}

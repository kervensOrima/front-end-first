import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Employee } from '../model/Employee';
import { EmployeeNbMonth } from '../model/EmployeeNbMonth';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private URL = 'http://localhost:9090/employee-management-app' ;

  constructor(private httpClient : HttpClient ) { }

  httpOtion =  {
    headers  : new HttpHeaders({
      'content-type' : 'application/json'
    })
  }

  public numberEmployeeActif() :Observable<number> {
      return this.httpClient.get<number>( `${ this.URL }` + "/employees-actif" )
      .pipe( retry(1) )
  }

  public numberEmployeeInactif() :Observable<number> {
    return this.httpClient.get<number>( `${ this.URL }` + "/employees-inactif" )
    .pipe( retry(1) )
  }


  public numberEmployeeCDD() :Observable<number> {
    return this.httpClient.get<number>( `${ this.URL }` + "/employees-cdd" )
    .pipe( retry(1) )
  }


  public numberEmployeeCDI() :Observable<number> {
    return this.httpClient.get<number>( `${ this.URL }` + "/employees-cid" )
    .pipe( retry(1) )
  }


  public employeeEmbaucheByMonth( year : number ) :Observable<EmployeeNbMonth[]> {
    return this.httpClient.get<EmployeeNbMonth[]>( `${ this.URL }` + '/employee-by-month/' + year ) 
    .pipe( retry(1) )
  }

  public employeeQuantity() :Observable<number> {
    return this.httpClient.get<number>( `${ this.URL }` + '/employees-quantity')
    .pipe( retry(1) )
  }


  public getEmployeeById( employeeID : number) : Observable<Employee> {
    return this.httpClient.get<Employee>( `${ this.URL }` + "/employee/" + employeeID )
    .pipe( retry(1) )
  }


  public getEmployees() :Observable<Employee[]> {
    return this.httpClient.get<Employee[]>( `${ this.URL }` + "/employees" )
    .pipe( retry(1 ) )
  }

  public getEmployeesByEtat( etat :string ) :Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(  `${ this.URL}` + "/employees-by-etat/" + etat )
    .pipe( retry( 1 ) )
  }

  public getEmployeesByTypeContrat( contrat :string ) :Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(  `${ this.URL}` + "/employees-by-type-contrat/" + contrat )
    .pipe( retry( 1 ) )
  }


  public getEmployeesNoContainContrat( isContrat:boolean) :Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(  `${ this.URL}` + "/employees-not-contains-contrat/" + isContrat  )
    .pipe( retry( 1 ) )
  }

  public updateEmployee( employee:Employee) :Observable<Employee> {
    return this.httpClient.put<Employee>( `${ this.URL }`  + "/employee", JSON.stringify( employee) , this.httpOtion )
    .pipe( retry(1 ) ) 
  }

  public saveEmployee(employee:Employee) :Observable<Employee>{
    console.log( employee )
    return this.httpClient.post<Employee>( `${ this.URL }` + '/employee' , JSON.stringify( employee) , this.httpOtion )
    .pipe( retry( 1) )
  }

  public deleteEmployee( employeeID:number) :Observable<any>{
      return this.httpClient.delete<any> ( `${ this.URL }` + '/employee/' + employeeID ) 
     .pipe( retry(1) )
  }

}

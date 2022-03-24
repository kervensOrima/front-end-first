import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Chart , registerables } from 'chart.js';
import { EmployeeNbMonth } from '../model/EmployeeNbMonth';
import { EmployeeService } from '../service/employee.service';
Chart.register(...registerables ) ;






@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private empService:EmployeeService ) { }

  year :Array<String> = [ "Jan" , "Feb" , "Mar" , "Apr"  , "May" , "Jun" , "Jui" , "Aout" , "Sept" , "Oct" , "Nov" , "Dec"] ;
  nombre :Array<Number> = [] ;

  an:Array<Number> = []
  

  dateActuel:number = new Date().getFullYear() ;
  
  nbActif:number = 0 ;
  nbInactif:number=0 ;
  nbCDD:number = 0
  nbCDI:number =0 ;
  nbEmployee:number =0 ;
  nbByMonth:number=0;


  changeYear(event: any) {
    this.getByMonth( +event.target.value )
 }

  ngOnInit(): void {

    for(let i = this.dateActuel ; i>= 2015  ;  i-- ) {
      this.an.push(i) ;
    }

    this.getNumbers() 

    this.getChart() ;
    
  }

  getChart() {
    console.log( this.nombre )
    new Chart("myChart", {
      type: 'bar',
      data: {
          labels: [ "Jan" , "Feb" , "Mar" , "Apr"  , "May" , "Jun" , "Jui" , "Aout" , "Sept" , "Oct" , "Nov" , "Dec"],
          datasets: [{
              label: "Liste employee embauchee pour l'année" + 2022 ,
              // data: [ 100, 200, 300, 400 , 500, 600 , 700, 800, 900, 1000, 11000, 12000] ,
              data: this.nombre ,
              backgroundColor: [
                  '#6610f2'
              ],
              borderColor: [
                  '#6610f2'
              ],
              borderWidth: 2
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
      });
  }



  private getByMonth( year :number) {

    //vider le tableau a chaque requet
    this.nombre = [] ;

    this.empService.employeeEmbaucheByMonth( year )
    .subscribe(
      ( items : EmployeeNbMonth [] ) => {
       
        items.forEach( item => {
          // console.log( item.nbEmployee )
          this.nombre.push( item.nbEmployee )
        })     
        
        console.log( this.nombre )
      } ,
      ( errors ) => {
        console.log( errors )
      } ,
      () => {
        console.log( 'Suceesfuly load') ;
      }
    )
  }


  private getNumbers() {
  
    this.empService.employeeQuantity()
    .subscribe(
      (nb:number) => {
        this.nbEmployee = nb ;
      } ,
      ( errors ) => {
        console.log( errors )
      } ,
    )

    // Recuperer lq quantite des employees empbauches par mois pour une annee
    this.getByMonth( this.dateActuel ) ;

    this.empService.numberEmployeeActif()
    .subscribe(
      (actif:number) => {
        this.nbActif = actif ;
      } ,
      ( errors ) => {
        console.log( errors )
      } ,
    )

    this.empService.numberEmployeeInactif() 
    .subscribe(
      (inactif:number) =>{
        this.nbInactif = inactif ;
      } ,
      (errors)=>{
        console.log( errors )
      }
    )


    this.empService.numberEmployeeCDD()
    .subscribe(
      ( cdd:number) =>{
        this.nbCDD = cdd ;
      } ,
      (errors) =>{
        console.log( errors ) 
      }
    )


    this.empService.numberEmployeeCDI()
    .subscribe(
      ( cdi:number) =>{
        this.nbCDI = cdi ;
      } ,
      (errors) =>{
        console.log( errors ) 
      }
    )

  }



}

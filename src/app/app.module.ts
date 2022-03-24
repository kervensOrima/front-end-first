import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { Routes , RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component' ;
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http" ;
import { EmployeeService } from './service/employee.service';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { FooterComponent } from './footer/footer.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { DataTablesModule } from 'angular-datatables';

const routes : Routes = [
  { path : 'home' , component : HomeComponent} ,
  { path : 'employee-form' , component:EmployeeFormComponent} ,
  { path : 'employee-form/:id' , component:EmployeeFormComponent} ,
  { path : 'employee-list' , component:EmployeeListComponent } ,
  { path : 'employee-view/:id' , component:EmployeeViewComponent } ,
  { path : 'dashboard' , component:DashboardComponent } ,
  { path : '' , component:HomeComponent} ,
  { path : '**' , component:PageNotFoundComponent , pathMatch:'full'}
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    EmployeeViewComponent,
    PageNotFoundComponent,
    EmployeeTableComponent,
    DashboardComponent,
    LeftMenuComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule ,
     RouterModule.forRoot( routes ) ,
     FormsModule ,
     ReactiveFormsModule ,
     HttpClientModule,
     DataTablesModule
     
  ],
  providers: [
    EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

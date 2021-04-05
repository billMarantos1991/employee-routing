import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AddAttributeComponent } from './attributes/add-attribute/add-attribute.component';
import { AttributeDetailsComponent } from './attributes/attribute-details/attribute-details.component';
import { AttributesComponent } from './attributes/attributes.component';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './employees/employee-details/employee.-details.component';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { FilteredEmployeesComponent } from './map/filtered-employees/filtered-employees.component';
import { MapComponent } from './map/map.component';
import { SearchViewComponent } from './map/search-view/search-view.component';

const routes: Routes = [

  {
    
    path:"",  component:HomeComponent,
    
  },
  {
    
    path:"attributes",
    children: [
      { path: '', component:AttributesComponent },
      { path: 'addAtribute', component: AddAttributeComponent },
      { path: ':id', component: AttributeDetailsComponent }
    ]
    
  },

  {
    path:"employees",
    children: [
      { path: '', component:EmployeesComponent },
      { path: 'addEmployee', component: AddEmployeeComponent },
      { path: ':id', component: EmployeeDetailsComponent }
    ]
    
  },

  {
    path:"map",
    children: [
      { path: '', component:SearchViewComponent },
      { path: ':id', component:FilteredEmployeesComponent },
      { path: 'routing/:id', component:MapComponent }
    ]     
    
  }
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [AttributesComponent,EmployeesComponent]

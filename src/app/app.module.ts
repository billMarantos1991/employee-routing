import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';   // agm-direction

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { HomeComponent } from './home/home.component';

import { AttributesComponent } from './attributes/attributes.component';
import { AttributeDetailsComponent } from './attributes/attribute-details/attribute-details.component';
import { AddAttributeComponent } from './attributes/add-attribute/add-attribute.component';
import { AttributesListComponent } from './attributes/attributes-list/attributes-list.component';

import { EmployeesComponent } from './employees/employees.component';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './employees/employee-details/employee.-details.component';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';

import { MapComponent } from './map/map.component';
import { SearchViewComponent } from './map/search-view/search-view.component';
import { FilteredEmployeesComponent } from './map/filtered-employees/filtered-employees.component';
import { InfoModalComponent } from './widgets/info-modal/info-modal.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,

    AttributeDetailsComponent,
    AddAttributeComponent,
    EmployeesComponent,
    AttributesComponent,
    AddEmployeeComponent,
    MapComponent,
    EmployeeDetailsComponent,
    MapComponent,
    SearchViewComponent,
    AttributesListComponent,
    FilteredEmployeesComponent,
    EmployeesListComponent,
    HomeComponent,
    InfoModalComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyDOfAm3scPmVW3AdCOA9EWGuB3ui7M5P3k'
    }),    
    AgmDirectionModule,
    RouterModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }

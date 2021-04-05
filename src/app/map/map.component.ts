import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from '../models/Address';
import { Employee } from '../models/Employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  //transportation mode
  transitOptions: string = 'TRANSIT';
  transitText: string = 'by feet';
  public markerOptions = {
    origin: {
        icon: '../assets/marker_black.png',
        scaledSize: {
          width: 20,
          height: 20
        }      
    },
    destination: {
        icon: '../assets/marker_red.png',
        scaledSize: {
          width: 20,
          height: 20
        } 
    },
}

employeeId=null;
public renderOptions = {
  suppressMarkers: true,
}
sellectedEmployee :Employee = new Employee();  
employees:Employee[];

  constructor( private employeeService: EmployeeService,  private route: ActivatedRoute) { }

  ngOnInit(): void {
  this.getEmployee();
  }
  //get selected employee
  getEmployee(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.employeeService.get( this.employeeId )
      .subscribe(
        data => {

          this.sellectedEmployee = data;
          this.sellectedEmployee = Object.assign( new Employee(), data);
          this.sellectedEmployee.address = Object.assign( new Address(), data.address);         
 
          if(this.sellectedEmployee.hasVehicle){
            this.transitOptions = 'DRIVING';
            this.transitText = 'by Car';
          }
        
          this.retrieveEmployees();
        
        },
        error => {
          console.log(error);
        });
  } 
  //get employees except selected employee
  retrieveEmployees() : void { 
    this.employeeService.getEmployeesNotContainingEmployee(this.employeeId )
      .subscribe(
        data => {
          this.employees = data;
       
        },
        error => {
          this.employees = [];
          console.log(error);
        });
  }

}

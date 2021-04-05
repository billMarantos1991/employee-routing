import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/Employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees:Employee[];


  constructor(private  employeeService:EmployeeService) {  }

  ngOnInit(): void {
    this.retrieveEmployees();
  }
  retrieveEmployees() : void { 
    this.employeeService.getAll()
      .subscribe(
        data => {
          this.employees = data;
          console.log(data);
        },
        error => {
          this.employees = [];
          console.log(error);
        });
  }

 
  deleteEmployee(id): void {
    this.employeeService.delete(id)
      .subscribe(
        response => {
          console.log(response);
          this.retrieveEmployees();
        },
        error => {
          console.log(error);
        });
  }  

}

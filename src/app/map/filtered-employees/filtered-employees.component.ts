import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/Employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-filtered-employees',
  templateUrl: './filtered-employees.component.html',
  styleUrls: ['./filtered-employees.component.css']
})
export class FilteredEmployeesComponent implements OnInit {

  employees:Employee[];
  
  constructor(
              private  employeeService:EmployeeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const attributeId = this.route.snapshot.paramMap.get('id');
    this.retrieveEmployees(attributeId);
  }
  retrieveEmployees(attributeId) : void { 
    this.employeeService.getEmployeesWithAttribute(attributeId)
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

  selectedEmployee(employeeId:number):void{
    this.router.navigate(['../routing/'+employeeId], {relativeTo:this.route});

  }
}

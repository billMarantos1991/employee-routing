import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/models/Employee';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  @Input() employees:Employee[];
  //show or not button add and delete
  @Input() isEditable:Boolean;
   
  @Output() selectedEmployee = new EventEmitter();

  @Output() deletedEmployee = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  //send selected id
  onSelect(employeeId:number):void{
    this.selectedEmployee.emit(employeeId);
  }
    //send selected id
    deleteEmployee(employeeId:number):void{
      this.deletedEmployee.emit(employeeId);
    }
}

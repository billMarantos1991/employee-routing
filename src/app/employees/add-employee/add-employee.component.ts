import { Attribute, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/models/Employee';
import { AttributeService } from 'src/app/services/attribute.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { InfoModalComponent } from 'src/app/widgets/info-modal/info-modal.component';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  
  selectedAttributesToAdd: any[];
  selectedAttributesToRemove: any[];
  selectedAttributes: any[];
  availableAttributes: any[];
  isAddMode: boolean;

  submitted = false;
  responseMessage = '';
  employee:Employee=new Employee();

  constructor(  private employeeService: EmployeeService,
                private attributeService: AttributeService,
                private modalService: NgbModal,
                private router: Router,
                private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.selectedAttributes=[];
    this.responseMessage = '';
    this.getAttributes();
    
  }
  //create employee button
  createEmployee(): void {
   
    this.employee.attributes=this.selectedAttributes;

    if(!this.employee.validate()) {
      this.responseMessage = 'Fill all the required fields!';
      this.openInfoWindow();
      return;
    } else if(!this.employee.address.isAddressNumberValid()){
      this.responseMessage = 'The number of adress must be number';
      this.openInfoWindow();
      return;      
    }
    else{
      this.getAddressFromGeoCoder();
    }
        

    
  }
  //convert address to lan and lat
  getAddressFromGeoCoder():void{
    const addressStr = this.employee.address.street +" "
          + this.employee.address.street +" "
          + this.employee.address.number +" "
          + this.employee.address.city +" ";

    this.employeeService.getLocation( addressStr)
      .subscribe(
        results => {
          if(results.status == "OK")
          {
            var points = results.results[0].geometry.location;
            this.employee.address.latitude = points.lat;
            this.employee.address.langtitude = points.lng;
          }

          this.createNewEmployee();
        },
        error => {
          console.log(error);
        });
  }
  // call service to save employee
  createNewEmployee():void{

    this.employeeService.create( this.employee)
    .subscribe(
      response => {
        setTimeout(():void=>{ this.router.navigate(['../'], {relativeTo:this.route});}, 1000);
        this.responseMessage = 'The Employee was created successfully!';
        this.openInfoWindow();
      },
      error => {
        console.log(error);
      });   
  }

  //get available attributes
  getAttributes(): void {
    this.attributeService.getAll()
      .subscribe(
        data => {
          this.availableAttributes = data;
     
        },
        error => {
          console.log(error);
        });
  }

  //connect attribute
  assign() {

    if(this.selectedAttributesToAdd === undefined)    {
      this.responseMessage = 'Please select an attribute.';
      this.openInfoWindow();
      return ;
    }

    this.selectedAttributes = this.selectedAttributes.concat(this.selectedAttributesToAdd);
    this.availableAttributes = this.availableAttributes.filter(selectedData => {

      return this.selectedAttributes.indexOf(selectedData) < 0;

    });

    this.selectedAttributesToAdd = [];
  }
   //remove connection of attribute
  unassign() {
    if(this.selectedAttributesToRemove === undefined){
      this.responseMessage = 'Please select an attribute.';
      this.openInfoWindow();    
      return ;
    }

    this.availableAttributes = this.availableAttributes.concat(this.selectedAttributesToRemove);
    this.selectedAttributes = this.selectedAttributes.filter(selectedData => {
      return this.availableAttributes.indexOf(selectedData) < 0;
    });
  
      this.selectedAttributesToRemove = [];
  }   
 

  //open modal window
  openInfoWindow() {
    const modalRef =  this.modalService.open(InfoModalComponent);
    modalRef.componentInstance.message = this.responseMessage;
  }

}

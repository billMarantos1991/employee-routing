import {  Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/Employee';
import { DatePipe } from '@angular/common';
import { AttributeService } from 'src/app/services/attribute.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoModalComponent } from 'src/app/widgets/info-modal/info-modal.component';
import { Address } from 'src/app/models/Address';
@Component({
  selector: 'app-employee-deatails',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
  providers:[DatePipe]   

})
export class EmployeeDetailsComponent implements OnInit {

  selectedAttributesToAdd: any[];
  selectedAttributesToRemove: any[];
  selectedAttributes: any[];
  availableAttributes: any[];


  submitted = false;
  responseMessage = '';
  currentEmployee = new Employee();


  
  constructor(  private employeeService: EmployeeService,
                private attributeService: AttributeService,
                private datepipe: DatePipe,
                private modalService: NgbModal,
                private router: Router,
                private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.selectedAttributes=[];
    this.currentEmployee.dateOfBirthday=null;
    this.responseMessage = '';
    this.getAttributes();

  }
  getEmployee(id): void {
    this.employeeService.get(id)
      .subscribe(
        data => {
          
          //create class for calling methods
          this.currentEmployee = Object.assign( new Employee(), data);
          this.currentEmployee.address = Object.assign( new Address(), data.address);
          //foramt date for input
          this.currentEmployee.dateOfBirthday = this.datepipe
          .transform(this.currentEmployee.dateOfBirthday, 'yyyy-MM-dd');
          this.splitAttributesFromConnected();
        },
        error => {
          console.log(error);
        });
  }  
  splitAttributesFromConnected():void{
    const conncetedAttributes = this.currentEmployee.attributes;
          
    for (let i = 0; i < conncetedAttributes.length; i++) {
      this.removeAttribute( conncetedAttributes[i]);
    }

    this.selectedAttributes = conncetedAttributes;
  }
  removeAttribute(attribute){
    this.availableAttributes.forEach( (item, index) => {

      if(item.attributeId === attribute.attributeId) this.availableAttributes.splice(index,1);
    });
  }

  getAttributes(): void {
    this.attributeService.getAll()
      .subscribe(
      data => {
        this.availableAttributes = data;
        this.getEmployee(this.route.snapshot.paramMap.get('id'));   

      },
      error => {
        console.log(error);
      });
  }
  updateEmployee(): void {
   
    this.currentEmployee.attributes = this.selectedAttributes;

    if(!this.currentEmployee.validate()) {
      this.responseMessage = 'Fill all the required fields!';
      this.openInfoWindow();
      return;
      
    } else if(!this.currentEmployee.address.isAddressNumberValid()){
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
    const addressStr = this.currentEmployee.address.street +" "
          + this.currentEmployee.address.street +" "
          + this.currentEmployee.address.number +" "
          + this.currentEmployee.address.city +" ";

    this.employeeService.getLocation( addressStr)
      .subscribe(
        results => {
          if(results.status == "OK")
          {
            var points = results.results[0].geometry.location;
            this.currentEmployee.address.latitude = points.lat;
            this.currentEmployee.address.langtitude = points.lng;
          }
          this.updateEmployeeApiCall();

        },
        error => {
          console.log(error);
        });
  }

  updateEmployeeApiCall():void{
    this.employeeService.update( this.currentEmployee)
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

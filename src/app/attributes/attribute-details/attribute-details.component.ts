import { Component, OnInit } from '@angular/core';
import { AttributeService } from 'src/app/services/attribute.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Attribute } from 'src/app/models/Attribute';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoModalComponent } from 'src/app/widgets/info-modal/info-modal.component';
@Component({
  selector: 'app-attribute-details',
  templateUrl: './attribute-details.component.html',
  styleUrls: ['./attribute-details.component.css']
})
export class AttributeDetailsComponent implements OnInit {

  currentAttribute = new Attribute();
  responseMessage = '';
  constructor(
                private attributeService: AttributeService,
                private modalService: NgbModal,
                private router: Router,
                private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.responseMessage = '';
    this.getAttribute(this.route.snapshot.paramMap.get('id'));   
  }
  
  getAttribute(id): void {
    this.attributeService.get(id)
      .subscribe(
        data => {
          //assign to new Objectt o Attribute to access methods of class
          this.currentAttribute = Object.assign( new Attribute(), data);
         
        },
        error => {
          console.log(error);
        });
  }

  updateAttribute(): void {

    //if input is not valid
    if(!this.currentAttribute.validate()) {
      this.responseMessage = 'Fill all the required fields!';
      this.openInfoWindow();
      return;
    }
      //save data to api
    this.attributeService.update( this.currentAttribute)
      .subscribe(
        response => {
          setTimeout(():void=>{ this.router.navigate(['../'], {relativeTo:this.route});}, 1000);
          this.responseMessage = 'The Attribute was updated successfully!';
          this.openInfoWindow();
        },
        error => {
          console.log(error);
        });
  }
  
  //open modal window
  openInfoWindow() {
    const modalRef =  this.modalService.open(InfoModalComponent);
    modalRef.componentInstance.message = this.responseMessage;
  }  
}

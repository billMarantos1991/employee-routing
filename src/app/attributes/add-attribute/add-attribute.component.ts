import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Attribute } from 'src/app/models/Attribute';
import { AttributeService } from 'src/app/services/attribute.service';
import { InfoModalComponent } from 'src/app/widgets/info-modal/info-modal.component';

@Component({
  selector: 'app-add-attribute',
  templateUrl: './add-attribute.component.html',
  styleUrls: ['./add-attribute.component.css']
})
export class AddAttributeComponent implements OnInit {


  newAttribute= new Attribute();
  responseMessage:String;
  
  constructor(
                private modalService: NgbModal,
                private attributeService: AttributeService,
                private router: Router,
                private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.responseMessage = '';

  }
  

  createAttribute(): void {

    if(!this.newAttribute.validate()) {
      this.responseMessage = 'Fill all the required fields!';
      this.openInfoWindow();
      return;
    }  

    this.attributeService.create( this.newAttribute)
      .subscribe(
        response => {
          console.log(response);
          setTimeout(():void=>{ this.router.navigate(['../'], {relativeTo:this.route});}, 1000);
          this.responseMessage = 'The Attribute was created successfully!';
          this.openInfoWindow();
        },
        error => {
          this.responseMessage = 'Error The Attribute was not created';
          this.openInfoWindow();
          console.log(error);
        });
  }
  openInfoWindow() {
    const modalRef =  this.modalService.open(InfoModalComponent);
    modalRef.componentInstance.message = this.responseMessage;
  }
}

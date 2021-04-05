import { Component, OnInit } from '@angular/core';
import { Attribute } from '../models/Attribute';
import { AttributeService } from '../services/attribute.service';


@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.css']
})
export class AttributesComponent implements OnInit {

  attributes:Attribute[];

  constructor(private attributeService: AttributeService) { }

  ngOnInit(): void {
    this.retrieveAttributes();
  }
  retrieveAttributes() : void { 
    this.attributeService.getAll()
      .subscribe(
        data => {
          this.attributes = data;
          console.log(data);
        },
        error => {
          this.attributes = [];
          console.log(error);
        });
  }

  deleteAttribute(id): void {
    this.attributeService.delete(id)
      .subscribe(
        response => {
          console.log(response);
          this.retrieveAttributes();
        },
        error => {
          console.log(error);
        });
  }  

}

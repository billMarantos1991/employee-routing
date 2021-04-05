import { Attribute, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-attributes-list',
  templateUrl: './attributes-list.component.html',
  styleUrls: ['./attributes-list.component.css']
})
export class AttributesListComponent implements OnInit {

  @Input() attributes:Attribute[];
  //show or not button add and delete
  @Input() isEditable:Boolean;
   
  @Output() selectedAttribute = new EventEmitter();

  @Output() deletedAttribute = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  
  //send selected id
  onSelect(attributeId:number):void{
    this.selectedAttribute.emit(attributeId);
  }
    //send selected id
    deleteAttribute(attributeId:number):void{
      this.deletedAttribute.emit(attributeId);
    }
}

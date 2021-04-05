import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Attribute } from 'src/app/models/Attribute';
import { AttributeService } from 'src/app/services/attribute.service';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent implements OnInit {

  attributes:Attribute[];

  constructor(
              private attributeService: AttributeService,
              private router: Router,
              private route: ActivatedRoute) { }

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
  selectAttribute(selectedAttributeId:number){
    this.router.navigate(['/map/'+selectedAttributeId], {relativeTo:this.route});


  }
}

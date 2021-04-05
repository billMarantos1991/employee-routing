import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.css']
})

export class InfoModalComponent implements OnInit {

  @Input() message:String;


  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }


}



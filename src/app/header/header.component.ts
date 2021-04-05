import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  menuItems =[
    {linkId:1,linkName:"Home",linkUrl:""},
    {linkId:1,linkName:"Attributes",linkUrl:"attributes"},
    {linkId:2,linkName:"Employees",linkUrl:"employees"},
    {linkId:3,linkName:"Map",linkUrl:"map"}    
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

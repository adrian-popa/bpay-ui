import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() title: string;

   notifications = [
     {id: 1, message: 'Unusual activity found on invoice number 253.'},
     {id: 2, message: 'Invoice number 433 is due in two days.'},
   ];

  constructor() { }

  ngOnInit() {
  }

}

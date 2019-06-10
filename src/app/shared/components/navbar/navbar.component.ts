import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() title: string;

   notifications = [
     {id: 1, message: 'Unusual activity found on invoice number TKASDKF124312.'},
     {id: 2, message: 'Invoice number SADF18318 is due in two days.'},
   ];

  constructor() { }

  ngOnInit() {
  }

}

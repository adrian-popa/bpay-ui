import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatTooltipModule
} from '@angular/material';

import { SatNativeDateModule } from 'saturn-datepicker';

import { SidenavComponent } from '@components/sidenav/sidenav.component';
import { NavbarComponent } from '@components/navbar/navbar.component';

@NgModule({
  declarations: [
    SidenavComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatTooltipModule,
    MatMenuModule,
    MatListModule,
    MatFormFieldModule,
    SatNativeDateModule,
    MatSelectModule,
    MatCardModule
  ],
  exports: [
    SidenavComponent,
    NavbarComponent,
    MatSelectModule,
    MatCardModule
  ]
})
export class SharedModule { }

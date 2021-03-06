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
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatTooltipModule
} from '@angular/material';

import { SatNativeDateModule } from 'saturn-datepicker';

import { SidenavComponent } from '@components/sidenav/sidenav.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { TableComponent } from '@components/table/table.component';

@NgModule({
  declarations: [
    SidenavComponent,
    NavbarComponent,
    TableComponent
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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule
  ],
  exports: [
    MatSelectModule,
    MatCardModule,
    SidenavComponent,
    NavbarComponent,
    TableComponent
  ]
})
export class SharedModule { }

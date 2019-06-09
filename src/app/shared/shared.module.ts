import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material';

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
    MatIconModule,
    MatBadgeModule,
    MatTooltipModule,
    MatMenuModule,
    MatListModule,
    MatFormFieldModule,
    SatNativeDateModule
  ],
  exports: [
    SidenavComponent,
    NavbarComponent
  ]
})
export class SharedModule { }

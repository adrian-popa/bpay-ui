import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { InvoicesRoutingModule } from './invoices-routing.module';

import { InvoicesComponent } from './pages/invoices/invoices.component';
import {MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';
import {SatDatepickerModule} from 'saturn-datepicker';

@NgModule({
  declarations: [
    InvoicesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InvoicesRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    SatDatepickerModule,
    MatInputModule
  ]
})
export class InvoicesModule { }

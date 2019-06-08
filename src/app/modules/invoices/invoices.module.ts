import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { invoicesReducer } from '@store/reducers/invoices.reducer';
import { InvoicesEffects } from '@store/effects/invoices.effects';

import { SharedModule } from '@shared/shared.module';

import { InvoicesRoutingModule } from './invoices-routing.module';

import { InvoicesComponent } from './pages/invoices/invoices.component';

@NgModule({
  declarations: [
    InvoicesComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('invoices', invoicesReducer),
    EffectsModule.forFeature([InvoicesEffects]),
    SharedModule,
    InvoicesRoutingModule
  ]
})
export class InvoicesModule { }

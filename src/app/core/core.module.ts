import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { invoicesReducer } from '@store/reducers/invoices.reducer';
import { InvoicesEffects } from '@store/effects/invoices.effects';

import { SharedModule } from '@shared/shared.module';

import { CoreComponent } from './core.component';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [CoreComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('invoices', invoicesReducer),
    EffectsModule.forFeature([InvoicesEffects]),
    SharedModule,
    CoreRoutingModule
  ]
})
export class CoreModule { }

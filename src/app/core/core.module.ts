import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { CoreComponent } from './core.component';
import {CoreRoutingModule} from './core-routing.module';

@NgModule({
  declarations: [CoreComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreRoutingModule
  ]
})
export class CoreModule { }

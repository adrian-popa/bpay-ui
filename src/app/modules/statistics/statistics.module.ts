import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { StatisticsRoutingModule } from './statistics-routing.module';

import { StatisticsComponent } from './pages/statistics/statistics.component';

@NgModule({
  declarations: [
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StatisticsRoutingModule
  ]
})
export class StatisticsModule { }

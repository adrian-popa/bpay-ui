import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatisticsComponent } from './pages/statistics/statistics.component';

const statisticsRoutes: Routes = [
  {path: '', component: StatisticsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(statisticsRoutes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }

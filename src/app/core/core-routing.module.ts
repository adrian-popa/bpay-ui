import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoreComponent } from './core.component';

const coreRoutes: Routes = [
  {
    path: '', component: CoreComponent, children: [
      {path: 'invoices', loadChildren: '@invoices/invoices.module#InvoicesModule'},
      {path: 'statistics', loadChildren: '@statistics/statistics.module#StatisticsModule'},
      {path: '**', redirectTo: '/invoices', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(coreRoutes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoicesComponent } from './pages/invoices/invoices.component';

const invoicesRoutes: Routes = [
  {path: '', component: InvoicesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(invoicesRoutes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }

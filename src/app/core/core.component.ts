import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { InvoicesState } from '@store/reducers/invoices.reducer';

import { GetInvoices } from '@store/actions/invoices.actions';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  constructor(private store: Store<InvoicesState>, private router: Router) { }

  ngOnInit() {
    this.getInvoices();
  }

  private getInvoices() {
    this.store.dispatch(new GetInvoices());
  }

  get pageTitle(): string {
    return this.router.url === '/invoices' ? 'Invoices' : 'Statistics';
  }

}

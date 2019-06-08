import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Invoice } from '@models/invoice.model';

import { getInvoices, InvoicesState } from '@store/reducers/invoices.reducer';

import { Observable } from 'rxjs';
import { GetInvoices } from '@store/actions/invoices.actions';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  invoices$: Observable<Invoice[]>;

  constructor(private store: Store<InvoicesState>) { }

  ngOnInit() {
    this.invoices$ = this.store.pipe(select(getInvoices));

    this.getInvoices();
  }

  private getInvoices() {
    this.store.dispatch(new GetInvoices());
  }

}

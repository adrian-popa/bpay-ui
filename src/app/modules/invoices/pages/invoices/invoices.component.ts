import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Invoice } from '@models/invoice.model';

import { getInvoices, InvoicesState } from '@store/reducers/invoices.reducer';

import { Observable } from 'rxjs';
import { GetInvoices } from '@store/actions/invoices.actions';
import {SatDatepickerRangeValue} from 'saturn-datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  invoices$: Observable<Invoice[]>;
  private invoices: Invoice[];
  private invoicesToDisplay: Invoice[];
  private locations: string[];
  private categories: string[];
  private customTags: string[];
  private selectedLocation: string;
  private selectedCategory: string;
  private selectedCustom: string;
  private selectedDate = { begin: new Date(), end: new Date() };

  constructor(private store: Store<InvoicesState>) {
    this.invoices = [];
    this.invoicesToDisplay = [];
    this.selectedLocation = 'None';
    this.selectedCategory = 'None';
    this.selectedCustom = 'None';
  }

  ngOnInit() {
    this.invoices$ = this.store.pipe(select(getInvoices));

    this.invoices$.subscribe(invoices => {
      this.invoices = invoices;
      this.invoicesToDisplay = invoices;
      this.locations = ['None'];
      this.categories = ['None'];
      this.customTags = ['None'];
      this.invoices.forEach(invoice => {
        this.locations.push(invoice.payment.billedAddress);
        this.categories.push(invoice.metadata.category);
        invoice.metadata.custom.forEach(customTag => this.customTags.push(customTag));
      });
    });

    this.getInvoices();
  }

  private getInvoices() {
    this.store.dispatch(new GetInvoices());
  }

  private updateSelectedDate(date) {
    this.selectedDate = date.value;
    this.filterInvoices();
  }

  private filterInvoices() {
    console.log(this.selectedDate);

    let invoicesCopy = this.invoices.slice();
    if (this.selectedLocation !== 'None') {
      invoicesCopy = invoicesCopy.filter(invoice => invoice.payment.billedAddress === this.selectedLocation);
    }
    if (this.selectedCategory !== 'None') {
      invoicesCopy = invoicesCopy.filter(invoice => invoice.metadata.category === this.selectedCategory);
    }
    if (this.selectedCustom !== 'None') {
      invoicesCopy = invoicesCopy.filter(invoice => invoice.metadata.custom.indexOf(this.selectedCustom) !== -1);
    }

    invoicesCopy = invoicesCopy.filter(invoice => {
      const start = moment(invoice.startDate, 'DD.MM.YYYY');
      const end = moment(invoice.endDate, 'DD.MM.YYYY');

      return this.selectedDate.begin <= start.toDate() && end.toDate() <= this.selectedDate.end;
    });

    this.invoicesToDisplay = invoicesCopy;
  }

}

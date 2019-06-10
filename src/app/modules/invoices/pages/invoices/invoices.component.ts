import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Invoice } from '@models/invoice.model';

import { getInvoices, InvoicesState } from '@store/reducers/invoices.reducer';

import * as moment from 'moment';


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent implements OnInit {

  invoices: Invoice[];
  invoicesToDisplay: Invoice[];

  selectedLocation: string;
  selectedCategory: string;
  selectedCustom: string;

  locations: Set<string>;
  categories: Set<string>;
  customTags: string[];

  selectedDate = { begin: null, end: null };

  constructor(private store: Store<InvoicesState>) {
    this.invoices = [];
    this.invoicesToDisplay = [];
    this.selectedLocation = 'None';
    this.selectedCategory = 'None';
    this.selectedCustom = 'None';
  }

  ngOnInit() {
    this.store.pipe(select(getInvoices)).subscribe(invoices => {
      this.invoices = invoices;
      this.invoicesToDisplay = invoices;
      this.locations = new Set(['None']);
      this.categories = new Set(['None']);
      this.customTags = ['None'];
      this.invoices.forEach(invoice => {
        this.locations.add(invoice.payment.billedAddress);
        this.categories.add(invoice.metadata.category);
        invoice.metadata.custom.forEach(customTag => this.customTags.push(customTag));
      });
    });
  }

  updateSelectedDate(date) {
    this.selectedDate = date.value;
    this.filterInvoices();
  }

  filterInvoices() {
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

    if (this.selectedDate.begin !== null) {
      invoicesCopy = invoicesCopy.filter(invoice => {
        const start = moment(invoice.startDate, 'DD.MM.YYYY');
        const end = moment(invoice.endDate, 'DD.MM.YYYY');

        return this.selectedDate.begin <= start.toDate() && end.toDate() <= this.selectedDate.end;
      });
    }

    this.invoicesToDisplay = invoicesCopy;
  }

}

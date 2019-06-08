import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {
  InvoicesActionTypes,
  GetInvoicesSuccess,
  GetInvoicesFailed
} from '../actions/invoices.actions';

import { InvoicesService } from '@services/invoices.service';

import { Invoice } from '@models/invoice.model';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class InvoicesEffects {

  @Effect() getInvoices$ = this.actions$.pipe(
    ofType(InvoicesActionTypes.GET_INVOICES),
    switchMap(() => this.invoicesService.getInvoices()),
    map((invoicesData: any) => new GetInvoicesSuccess(InvoicesEffects.mapInvoices(invoicesData))),
    catchError(error => of(new GetInvoicesFailed(error)))
  );

  static mapInvoices(invoices: any[] = []) {
    return invoices.map(invoice => new Invoice(invoice));
  }

  constructor(private actions$: Actions, private invoicesService: InvoicesService) {
  }

}

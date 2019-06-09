import { Action } from '@ngrx/store';

export enum InvoicesActionTypes {
  GET_INVOICES = '[Invoices] Get Invoices',
  GET_INVOICES_SUCCESS = '[Invoices API] Get Invoices Success',
  GET_INVOICES_FAILED = '[Invoices API] Get Invoices Failed'
}

export class GetInvoices implements Action {
  readonly type = InvoicesActionTypes.GET_INVOICES;
}

export class GetInvoicesSuccess implements Action {
  readonly type = InvoicesActionTypes.GET_INVOICES_SUCCESS;

  constructor(public payload: any) {}
}

export class GetInvoicesFailed implements Action {
  readonly type = InvoicesActionTypes.GET_INVOICES_FAILED;

  constructor(public error: any) { }
}

export type InvoicesActions
  = GetInvoices |
  GetInvoicesSuccess |
  GetInvoicesFailed;

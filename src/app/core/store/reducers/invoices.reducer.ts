import { InvoicesActions, InvoicesActionTypes } from '../actions/invoices.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Invoice } from '@models/invoice.model';

export interface InvoicesState {
  invoices: Invoice[];
  isLoading: boolean;
  error: string;
}

export const initialInvoicesState: InvoicesState = {
  invoices: [],
  isLoading: true,
  error: ''
};

export function invoicesReducer(state = initialInvoicesState, action: InvoicesActions) {
  switch (action.type) {
    case InvoicesActionTypes.GET_INVOICES:
      return {
        ...state,
        isLoading: true
      };

    case InvoicesActionTypes.GET_INVOICES_SUCCESS:
      return {
        ...state,
        invoices: action.payload,
        isLoading: false
      };

    case InvoicesActionTypes.GET_INVOICES_FAILED:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };

    default:
      return state;
  }
}

export const getInvoicesState = createFeatureSelector<InvoicesState>('invoices');
export const getInvoices = createSelector(getInvoicesState, (state: InvoicesState) => state.invoices);
export const isLoading = createSelector(getInvoicesState, (state: InvoicesState) => state.isLoading);
export const getError = createSelector(getInvoicesState, (state: InvoicesState) => state.error);

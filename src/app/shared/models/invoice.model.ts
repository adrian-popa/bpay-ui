import { Metadata } from '@models/metadata.model';
import { Payment } from '@models/payment.model';

export class Invoice {

  public client: string;
  public metadata: Metadata;
  public payment: Payment;
  public endDate: string;
  public startDate: string;

  constructor(invoice: any = {}) {
    this.client = invoice.client;
    this.metadata = invoice.metadata;
    this.payment = invoice.payment;
    this.endDate = invoice.endDate;
    this.startDate = invoice.startDate;
  }

}

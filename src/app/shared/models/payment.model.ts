export class Payment {
  public amount: number;
  public beneficiaryAddress: string;
  public beneficiaryIBAN: string;
  public beneficiaryName: string;
  public invoiceNumber: string;
  public payed: string;

  constructor(payment: any = {}) {
    this.amount = payment.amount;
    this.beneficiaryAddress = payment.beneficiaryAddress;
    this.beneficiaryIBAN = payment.beneficiaryIBAN;
    this.beneficiaryName = payment.beneficiaryName;
    this.invoiceNumber = payment.invoiceNumber;
    this.payed = payment.payed;
  }
}

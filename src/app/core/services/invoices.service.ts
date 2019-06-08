import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  constructor(private af: AngularFirestore) { }

  getInvoices() {
    return this.af.collection('bills').valueChanges();
  }
}

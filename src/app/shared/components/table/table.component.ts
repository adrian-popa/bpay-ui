import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Invoice } from '@models/invoice.model';
import * as moment from 'moment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() data: any[];

  public dataSource: MatTableDataSource< Invoice[] >;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sorter: MatSort;

  columnsName = ['name', 'address', 'number', 'amount', 'period', 'button'];

  constructor() {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && this.data) {
      this.data = this.data.map(invoice => {
        if (moment(invoice.endDate, 'DD.MM.YYY').toDate() < (new Date())) {
          invoice.priority = 2;
        } else {
          if (!invoice.metadata.trusted) {
            invoice.priority = 1;
          } else {
            invoice.priority = 0;
          }
        }

        return invoice;
      });
      this.data = this.data.sort((a, b) => b.priority - a.priority);
      this.dataSource = new MatTableDataSource<Invoice[]>(this.data);
      this.dataSource.paginator = this.paginator;
    }
  }

}

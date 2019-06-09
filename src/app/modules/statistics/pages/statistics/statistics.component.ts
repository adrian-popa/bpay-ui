import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { getInvoices, InvoicesState } from '@store/reducers/invoices.reducer';

import { Invoice } from '@models/invoice.model';

import { Chart } from 'chart.js';

import {Observable} from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  @ViewChild('canvasLocations', {static : true}) canvasLocations;
  @ViewChild('canvasCategories', {static : true}) canvasCategories;
  chartLocations;
  chartCategories;
  selectedLocation;
  selectedCategory;
  invoices$: Observable<Invoice[]>;
  private invoices: Invoice[];
  private invoicesToDisplay: Invoice[];
  private locations: string[];
  private categories: string[];
  constructor(private store: Store<InvoicesState>) {
    this.invoices = [];
    this.invoicesToDisplay = [];
  }

  ngOnInit() {
    this.chartLocations = this.createPieChart(this.canvasLocations, [], []);
    this.chartCategories = this.createPieChart(this.canvasCategories, [], []);
    this.chartLocations.canvas.parentNode.style.height = '428px';
    this.chartLocations.canvas.parentNode.style.width = '428px';
    this.chartCategories.canvas.parentNode.style.height = '428px';
    this.chartCategories.canvas.parentNode.style.width = '428px';

    this.invoices$ = this.store.pipe(select(getInvoices));

    this.invoices$.subscribe(invoices => {
      this.invoices = invoices;
      this.invoicesToDisplay = invoices;
      this.locations = [];
      this.categories = [];
      this.invoices.forEach(invoice => {
        this.locations.push(invoice.payment.billedAddress);
        this.categories.push(invoice.metadata.category);
      });
      this.filterByCategory();
      this.filterByLocation();
    });
  }

  private createPieChart(canvas, chartLabels, chartData) {
    return new Chart(canvas.nativeElement, {
      type: 'pie',
      data: {
        labels: chartLabels,
        datasets: [{
          label: '#',
          data: chartData,
          backgroundColor: [
            'rgba(255, 76, 76, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            '#ccc'
          ],
          hoverBackgroundColor: [
            'rgba(255, 76, 76, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            '#ccc'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          position : 'bottom'
        }
      }
    });
  }

  private updatePieChart(chart, newChartLabels, newChartData) {
    chart.data.labels = newChartLabels;
    chart.data.datasets.forEach((dataset) => {
      dataset.data = newChartData;
    });
    chart.update();
  }

  private filterByCategory() {
    let invoicesCopy = this.invoices.slice();
    if (this.selectedCategory !== undefined) {
      invoicesCopy = invoicesCopy.filter(invoice => invoice.metadata.category === this.selectedCategory);
    }

    const chartLabels = this.locations;
    const chartData = [];
    chartLabels.forEach((location) => {
      chartData.push(0);
    });
    invoicesCopy.forEach((invoice) => {
      chartLabels.forEach((location, i) => {
        if (invoice.payment.billedAddress === location) {
          chartData[i] += invoice.payment.amount;
        }
      });
    });
    this.updatePieChart(this.chartLocations, chartLabels, chartData);
  }

  private filterByLocation() {
    console.log(this.selectedLocation);
    let invoicesCopy = this.invoices.slice();
    if (this.selectedCategory !== undefined) {
      invoicesCopy = invoicesCopy.filter(invoice => invoice.payment.billedAddress === this.selectedLocation);
    }

    const chartLabels = this.categories;
    const chartData = [];
    chartLabels.forEach((location) => {
      chartData.push(0);
    });
    invoicesCopy.forEach((invoice) => {
      chartLabels.forEach((categories, i) => {
        if (invoice.metadata.category === categories) {
          chartData[i] += invoice.payment.amount;
        }
      });
    });
    this.updatePieChart(this.chartCategories, chartLabels, chartData);
  }

}


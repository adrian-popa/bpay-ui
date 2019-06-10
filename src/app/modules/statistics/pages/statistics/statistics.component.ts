import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { getInvoices, InvoicesState } from '@store/reducers/invoices.reducer';

import { Invoice } from '@models/invoice.model';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  @ViewChild('canvasLocations', {static : true}) canvasLocations;
  @ViewChild('canvasCategories', {static : true}) canvasCategories;

  invoices: Invoice[];
  locations: Set<string>;
  categories: Set<string>;

  chartLocations;
  chartCategories;
  selectedLocation;
  selectedCategory;

  private static createPieChart(canvas, chartLabels, chartData) {
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

  constructor(private store: Store<InvoicesState>) {
    this.invoices = [];
  }

  ngOnInit() {
    this.chartLocations = StatisticsComponent.createPieChart(this.canvasLocations, [], []);
    this.chartCategories = StatisticsComponent.createPieChart(this.canvasCategories, [], []);
    this.chartLocations.canvas.parentNode.style.height = '428px';
    this.chartLocations.canvas.parentNode.style.width = '600px';
    this.chartCategories.canvas.parentNode.style.height = '428px';
    this.chartCategories.canvas.parentNode.style.width = '600px';

    this.store.pipe(select(getInvoices)).subscribe(invoices => {
      this.invoices = invoices;
      this.locations = new Set();
      this.categories = new Set();
      this.invoices.forEach(invoice => {
        this.locations.add(invoice.payment.billedAddress);
        this.categories.add(invoice.metadata.category);
      });
      this.filterByCategory();
      this.filterByLocation();
    });
  }

  private updatePieChart(chart, newChartLabels, newChartData) {
    chart.data.labels = newChartLabels;
    chart.data.datasets.forEach((dataset) => {
      dataset.data = newChartData;
    });
    chart.update();
  }

  filterByCategory() {
    let invoicesCopy = this.invoices.slice();
    if (this.selectedCategory !== undefined) {
      invoicesCopy = invoicesCopy.filter(invoice => invoice.metadata.category === this.selectedCategory);
    }

    const chartLabels = Array.from<string>(this.locations);
    const chartData = [];
    chartLabels.forEach(() => {
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

  filterByLocation() {
    console.log(this.selectedLocation);
    let invoicesCopy = this.invoices.slice();
    if (this.selectedLocation !== undefined) {
      invoicesCopy = invoicesCopy.filter(invoice => invoice.payment.billedAddress === this.selectedLocation);
    }

    const chartLabels = Array.from<string>(this.categories);
    const chartData = [];
    chartLabels.forEach(() => {
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


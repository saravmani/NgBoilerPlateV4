import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';

// Import our custom AG Grid styles
import './ag-grid-styles.css';

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [CommonModule, RouterModule, AgGridModule],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.css'
})
export class StocksComponent implements OnInit {  // Column Definitions
  columnDefs: ColDef[] = [
    { field: 'symbol', sortable: true, filter: true, width: 100 },
    { field: 'name', sortable: true, filter: true, flex: 2 },
    { field: 'price', sortable: true, filter: true, width: 120 },
    { field: 'change', sortable: true, filter: true, width: 120 },
    { field: 'changePercent', headerName: 'Change %', sortable: true, filter: true, width: 120 }
  ];

  // Row Data
  rowData = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 182.30, change: 4.12, changePercent: 2.3 },
    { symbol: 'MSFT', name: 'Microsoft Corporation', price: 336.75, change: 5.65, changePercent: 1.7 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 135.60, change: -0.68, changePercent: -0.5 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 178.20, change: 2.11, changePercent: 1.2 },
    { symbol: 'TSLA', name: 'Tesla, Inc.', price: 227.45, change: -1.82, changePercent: -0.8 },
    { symbol: 'META', name: 'Meta Platforms Inc.', price: 475.30, change: 7.65, changePercent: 1.6 },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 924.15, change: 15.75, changePercent: 1.7 }
  ];
  // Default Column Configuration
  defaultColDef = {
    flex: 1,
    minWidth: 80,
    resizable: true
  };

  constructor() { }

  ngOnInit(): void { }

  onGridReady(params: GridReadyEvent) {
    // Grid is ready
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { StockService, StockData } from '../../services/stock.service';

// Import our custom AG Grid styles
import './ag-grid-styles.css';

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [CommonModule, RouterModule, AgGridModule],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.css'
})
export class StocksComponent implements OnInit {
  // Column Definitions
  columnDefs: ColDef[] = [
    { field: 'symbol', sortable: true, filter: true, width: 100 },
    { field: 'name', sortable: true, filter: true, flex: 1, maxWidth: 400 },
    { field: 'price', sortable: true, filter: true, width: 120 },
    { field: 'change', sortable: true, filter: true, width: 120 },
    { field: 'changePercent', headerName: 'Change %', sortable: true, filter: true, width: 120, flex: 1, maxWidth: 400 }
  ];
  
  // Row Data
  rowData: StockData[] = [];
  
  // Infinite scroll datasource
  dataSource: any;
  
  // All stock data (will be used for the infinite scroll implementation)
  allStockData: StockData[] = [];

  // Default Column Configuration
  defaultColDef = {
    flex: 1,
    minWidth: 80,
    sortable: true,
    filter: true,
    resizable: true
  };

  constructor(private stockService: StockService) { }
  ngOnInit(): void {
    // Load all stock data from the service to use with infinite scrolling
    this.stockService.getStockData().subscribe(data => {
      this.allStockData = data;
      this.setupInfiniteScrollDataSource();
    });
  }

  onGridReady(params: GridReadyEvent) {
    // Set up the datasource after the grid is ready
    if (this.allStockData.length > 0) {
      this.setupInfiniteScrollDataSource();
    }
  }
  
  /**
   * Sets up the infinite scroll data source for the AG Grid
   */
  private setupInfiniteScrollDataSource(): void {
    this.dataSource = {
      getRows: (params: any) => {
        console.log('Asking for rows: ' + params.startRow + ' to ' + params.endRow);
        
        // Extract the requested block of data from the larger dataset
        const rowsThisPage = this.allStockData.slice(params.startRow, params.endRow);
        
        // Calculate the last row based on total dataset size
        const lastRow = params.endRow >= this.allStockData.length 
          ? this.allStockData.length 
          : -1; // -1 tells the grid that there are more rows to fetch
        
        // Call the success callback with the rows for this block and the last row indicator
        setTimeout(() => {
          params.successCallback(rowsThisPage, lastRow);
        }, 500); // Adding a small delay to simulate network request
      }
    };
  }
}

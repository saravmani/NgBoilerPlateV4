import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { MutualFundService, MutualFundData } from '../../services/mutual-fund.service';

@Component({
  selector: 'app-mutual-funds',
  standalone: true,
  imports: [CommonModule, RouterModule, AgGridModule],
  templateUrl: './mutual-funds.component.html',
  styleUrl: './mutual-funds.component.css'
})
export class MutualFundsComponent implements OnInit {
  // Column Definitions
  columnDefs: ColDef[] = [
    { field: 'symbol', sortable: true, filter: true, width: 100 },
    { field: 'name', sortable: true, filter: true, flex: 1, maxWidth: 400 },
    { field: 'nav', headerName: 'NAV ($)', sortable: true, filter: true, width: 120 },
    { field: 'category', sortable: true, filter: true, width: 120 },
    { field: 'ytdReturn', headerName: 'YTD Return (%)', sortable: true, filter: true, width: 150 },
    { field: 'expenseRatio', headerName: 'Expense Ratio (%)', sortable: true, filter: true, width: 150 },
    { field: 'riskRating', headerName: 'Risk', sortable: true, filter: true, width: 120 }
  ];
  
  // Row Data
  rowData: MutualFundData[] = [];

  // Default Column Configuration
  defaultColDef = {
    flex: 1,
    minWidth: 80,
    sortable: true,
    filter: true,
    resizable: true
  };

  constructor(private mutualFundService: MutualFundService) { }

  ngOnInit(): void {
    // Load mutual fund data from the service
    this.mutualFundService.getMutualFundData().subscribe(data => {
      this.rowData = data;
    });
  }

  onGridReady(params: GridReadyEvent) {
    // Grid is ready - could potentially reload data here if needed
  }
}

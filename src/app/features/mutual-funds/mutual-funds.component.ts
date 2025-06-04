import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { MutualFundService, MutualFundData, ApiPost } from '../../services/mutual-fund.service';

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
  apiPosts: ApiPost[] = [];
  loading = false;
  errorMessage = '';

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
    this.loadMockData();
    this.loadApiData();
  }

  loadMockData(): void {
    // Load static mutual fund data from the service
    this.mutualFundService.getMutualFundData().subscribe(data => {
      this.rowData = data;
    });
  }

  loadApiData(): void {
    this.loading = true;
    this.errorMessage = '';
    
    // Fetch API posts
    this.mutualFundService.getApiPosts().subscribe({
      next: (posts) => {
        this.apiPosts = posts.slice(0, 5); // Take first 5 posts
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load API data';
        this.loading = false;
        console.error('API Error:', error);
      }
    });
  }

  loadTransformedData(): void {
    this.loading = true;
    this.errorMessage = '';
    
    // Load transformed API data as mutual funds
    this.mutualFundService.getTransformedMutualFunds().subscribe({
      next: (transformedData) => {
        this.rowData = transformedData;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load transformed data';
        this.loading = false;
        console.error('Transform Error:', error);
      }
    });
  }

  loadSpecificPost(id: number): void {
    this.mutualFundService.getApiPostById(id).subscribe({
      next: (post) => {
        if (post) {
          console.log('Specific post loaded:', post);
          alert(`Post ${post.id}: ${post.title}`);
        } else {
          console.log('Post not found');
        }
      },
      error: (error) => {
        console.error('Error loading specific post:', error);
      }
    });
  }

  onGridReady(params: GridReadyEvent) {
    // Grid is ready - could potentially reload data here if needed
  }
}

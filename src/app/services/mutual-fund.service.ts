import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ColDef } from 'ag-grid-community';

// Mutual Fund data interface
export interface MutualFundData {
  symbol: string;
  name: string;
  nav: number;  // Net Asset Value
  category: string;
  ytdReturn: number; // Year-to-date Return
  expenseRatio: number;
  riskRating: string;
}

@Injectable({
  providedIn: 'root'
})
export class MutualFundService {

  constructor() { }

  /**
   * Get mutual fund data for the grid
   * In the future, this would be an API call
   */
  getMutualFundData(): Observable<MutualFundData[]> {
    const mutualFundData: MutualFundData[] = [
      { symbol: 'VFIAX', name: 'Vanguard 500 Index Fund', nav: 468.53, category: 'Large Cap', ytdReturn: 5.2, expenseRatio: 0.04, riskRating: 'Moderate' },
      { symbol: 'FXAIX', name: 'Fidelity 500 Index Fund', nav: 182.64, category: 'Large Cap', ytdReturn: 5.1, expenseRatio: 0.015, riskRating: 'Moderate' },
      { symbol: 'VTSAX', name: 'Vanguard Total Stock Market Index Fund', nav: 124.92, category: 'Total Market', ytdReturn: 4.8, expenseRatio: 0.04, riskRating: 'Moderate' },
      { symbol: 'VBTLX', name: 'Vanguard Total Bond Market Index Fund', nav: 10.47, category: 'Bond', ytdReturn: -0.8, expenseRatio: 0.05, riskRating: 'Low' },
      { symbol: 'VTIAX', name: 'Vanguard Total International Stock Index Fund', nav: 33.15, category: 'International', ytdReturn: 2.4, expenseRatio: 0.11, riskRating: 'High' },
      { symbol: 'VWUSX', name: 'Vanguard US Growth Fund', nav: 169.27, category: 'Growth', ytdReturn: 8.3, expenseRatio: 0.39, riskRating: 'High' },
      { symbol: 'VWINX', name: 'Vanguard Wellesley Income Fund', nav: 28.41, category: 'Balanced', ytdReturn: 1.5, expenseRatio: 0.23, riskRating: 'Low' },
      { symbol: 'PRMTX', name: 'T. Rowe Price Mid-Cap Growth Fund', nav: 108.25, category: 'Mid Cap', ytdReturn: 6.2, expenseRatio: 0.61, riskRating: 'High' },
      { symbol: 'FSSNX', name: 'Fidelity Small Cap Index Fund', nav: 29.87, category: 'Small Cap', ytdReturn: 3.7, expenseRatio: 0.025, riskRating: 'High' },
      { symbol: 'DODFX', name: 'Dodge & Cox International Stock Fund', nav: 47.26, category: 'International', ytdReturn: 2.1, expenseRatio: 0.62, riskRating: 'High' },
      { symbol: 'FTBFX', name: 'Fidelity Total Bond Fund', nav: 10.81, category: 'Bond', ytdReturn: -0.6, expenseRatio: 0.45, riskRating: 'Low' },
      { symbol: 'VGSLX', name: 'Vanguard Real Estate Index Fund', nav: 115.23, category: 'Real Estate', ytdReturn: -2.1, expenseRatio: 0.12, riskRating: 'High' }
    ];
    
    return of(mutualFundData);
  }

  /**
   * Get default column definition
   */
  getDefaultColDef(): Observable<any> {
    return of({
      flex: 1,
      minWidth: 80,
      resizable: true,
      sortable: true,
      filter: true
    });
  }
}
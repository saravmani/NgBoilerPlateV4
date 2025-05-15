import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ColDef } from 'ag-grid-community';

// Stock data interface
export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor() { }
 
  /**
   * Get stock data for the grid
   * In the future, this would be an API call
   */
  getStockData(): Observable<StockData[]> {
    // Create a larger dataset for infinite scrolling
    const stockData: StockData[] = this.generateMockStockData();
    return of(stockData);
  }
  
  /**
   * Generate mock stock data for testing infinite scrolling
   * In a real application, this would be replaced by API calls
   */  private generateMockStockData(): StockData[] {
    const baseStocks: StockData[] = [
      { symbol: 'AAPL', name: 'Apple Inc.', price: 182.30, change: 4.12, changePercent: 2.3 },
      { symbol: 'MSFT', name: 'Microsoft Corporation', price: 336.75, change: 5.65, changePercent: 1.7 },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 135.60, change: -0.68, changePercent: -0.5 },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 178.20, change: 2.11, changePercent: 1.2 },
      { symbol: 'TSLA', name: 'Tesla, Inc.', price: 227.45, change: -1.82, changePercent: -0.8 },
      { symbol: 'META', name: 'Meta Platforms Inc.', price: 475.30, change: 7.65, changePercent: 1.6 },
      { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 924.15, change: 15.75, changePercent: 1.7 }
    ];

    // Generate 1000 records for infinite scrolling testing
    const result: StockData[] = [];
    for (let i = 0; i < 1000; i++) {
      // Use the base stocks as templates and modify them slightly to create variation
      const baseStock = baseStocks[i % baseStocks.length];
      const randomFactor = 0.95 + Math.random() * 0.1; // Random factor between 0.95 and 1.05
      
      result.push({
        symbol: `${baseStock.symbol}${Math.floor(i / baseStocks.length)}`,
        name: `${baseStock.name} (${Math.floor(i / baseStocks.length)})`,
        price: +(baseStock.price * randomFactor).toFixed(2),
        change: +(baseStock.change * randomFactor).toFixed(2),
        changePercent: +(baseStock.changePercent * randomFactor).toFixed(2)
      });
    }
    
    return result;
  }

  /**
   * Get default column definition
   */
  getDefaultColDef(): Observable<any> {
    return of({
      flex: 1,
      minWidth: 80,
      resizable: true
    });
  }
}

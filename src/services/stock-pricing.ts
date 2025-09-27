import { Injectable } from '@angular/core';
import { delay, of, Observable } from 'rxjs';

export interface StockPricing {
  id: string;
  symbol: string;
  open: number;
  close: number;
  ask: number;
  high: number;
  low: number;
}


@Injectable({
  providedIn: 'root'
})


export class StockPricing {
  
  private stockPricing: StockPricing[] = [];
  private dataLoaded = false;

  constructor() {
    this.loadData();
  }

    private async loadData() {
    try {
      const response = await fetch('/pricing.json');
      this.stockPricing = await response.json();
      this.dataLoaded = true;
    } catch (error) {
      this.stockPricing = [];
      this.dataLoaded = true;
    }
  }

   getPricingById(id: string): Observable<StockPricing | null> {
    const pricing = this.stockPricing.find(stock => stock.id === id);
    return of(pricing || null).pipe(
      delay(300) 
    );
  }

  searchBySymbol(symbol: string, page: number = 1, pageSize: number = 20): Observable<any> {
    const filteredStocks = this.stockPricing.filter(
      stock => stock.symbol.toLowerCase().includes(symbol.toLowerCase())
    );
    const totalItems = filteredStocks.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredStocks.slice(startIndex, endIndex);
    
    const response = {
      data: paginatedData,
      totalItems: totalItems,
      totalPages: totalPages,
      currentPage: page,
      pageSize: pageSize
    };
    
    return of(response).pipe(
      delay(300)
    );
  }
  
    getStockPricingPaginated(page: number = 1, pageSize: number = 10): Observable<{
    data: StockPricing[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  }> {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = this.stockPricing.slice(startIndex, endIndex);
    const totalItems = this.stockPricing.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    return of({
      data: paginatedData,
      totalItems,
      totalPages,
      currentPage: page,
      pageSize
    }).pipe(
      delay(400) 
    );
  }

}
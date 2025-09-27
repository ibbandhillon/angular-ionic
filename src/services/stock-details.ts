import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface StockDetail {
  id: string;
  symbol: string;
  type: 'stock' | 'etf';
  fullName: string;
  logo: string;
  volume: number;
  marketCap: number;
}

@Injectable({
  providedIn: 'root',
})
export class StockDetails {
  private stockDetails: StockDetail[] = [];
  private dataLoaded = false;

  constructor() {
    this.loadData();
  }

  private async loadData() {
    try {
      const response = await fetch('/details.json');
      this.stockDetails = await response.json();
      this.dataLoaded = true;
    } catch (error) {
      this.stockDetails = [];
      this.dataLoaded = true;
    }
  }

    fetchDetailsBySymbol(symbol: string): Observable<StockDetail | null> {
    return new Observable(subscriber => {
      const checkAndReturn = () => {
        if (this.dataLoaded) {
          const stockDetail = this.stockDetails.find(stock => stock.symbol === symbol);
          setTimeout(() => {
            subscriber.next(stockDetail || null);
            subscriber.complete();
          }, 300);
        } else {
          setTimeout(checkAndReturn, 50);
        }
      };
      checkAndReturn();
    });
  }
}

import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

export interface StockHolding{
  symbol: string;
  company: string;
  shares: number;
  price: number;
  changePercent: number;
}


export interface HoldingsSummary{
  totalEquity: number;
  stocks: StockHolding[];
}

@Injectable({
  providedIn: 'root'
})


export class HoldingsService {

  private mockHoldings: StockHolding[] = [
    { symbol: 'AAPL', company: 'Apple Inc.', shares: 3.0282, price: 105.44, changePercent: 22.90 },
    { symbol: 'TSLA', company: 'Tesla, Inc.', shares: 3.0282, price: 105.44, changePercent: 22.90 },
    { symbol: 'TIK', company: 'Tik Tok Corp.', shares: 3.0282, price: 105.44, changePercent: 22.90 }
  ];


  getHoldingsSummary(): Observable<HoldingsSummary> {
    return of(this.mockHoldings).pipe(
      map(stocks => {

        const totalEquity = stocks.reduce(
          (sum, stock) => sum + (stock.shares * stock.price),
          0
        );

      
        const actualTotalEquity = 8036; 

        return {
          
          stocks: stocks,
        }  as HoldingsSummary;
      })
    );
  }


  getAllStocks(): Observable<StockHolding[]> {
    return this.getHoldingsSummary().pipe(
      map(summary => summary.stocks)
    );
  }
}
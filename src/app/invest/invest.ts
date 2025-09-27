import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
} from '@ionic/angular/standalone';
import {
  HoldingsService,
  HoldingsSummary,
  StockHolding,
} from '../../services/holdings';
import { StockPricing, StockPricingService } from '../../services/stock-pricing';
import { StockCard } from '../stock-card/stock-card';
import Swiper from 'swiper';

@Component({
  selector: 'app-invest',
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonLabel,
    IonNote,
    StockCard,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './invest.html',
  styleUrl: './invest.css',
})
export class Invest implements OnInit {
  holdings = signal<StockHolding[]>([]);

  totalHoldings = signal<number>(0);
  stocks = signal<StockPricing[]>([]);
  holdingService = inject(HoldingsService);
  stockPricing = inject(StockPricingService);

  ngOnInit(): void {
        setTimeout(() => {
        this.stockPricing.getStockPricingPaginated(1,3).subscribe(res=>{
        this.stocks.set(res.data);
      })
    }, 500);
  
    this.holdingService
      .getHoldingsSummary()
      .subscribe((res: HoldingsSummary) => {
        this.holdings.set(res.stocks);
        this.totalHoldings.set(res.totalEquity);
      });

  }


  getChange(stock: StockHolding): number {
    return stock.changePercent;
  }

  getChangeText(stock: StockHolding): string {
    const sign = stock.changePercent >= 0 ? '+' : '';
    return `(${sign}${stock.changePercent.toFixed(2)}%)`;
  }

  formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }
}

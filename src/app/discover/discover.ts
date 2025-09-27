import { Component, OnInit } from '@angular/core';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonSearchbar,
  IonList, 
  IonItem, 
  IonLabel, 
  IonNote, 
  IonCard, 
  IonCardContent, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonButton, 
  IonSpinner, 
  IonFab, 
  IonFabButton 
} from '@ionic/angular/standalone';
import { StockPricingService, StockPricing } from './../../services/stock-pricing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discover',
  imports: [
        IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonList,
    IonItem,
    IonLabel,
    IonNote,
    IonCard,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonSpinner,
    IonFab,
    IonFabButton,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './discover.html',
  styleUrl: './discover.css'
})
export class Discover implements OnInit {
  stocks: StockPricing[] = [];
  loading = false;
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;
  showLoadMore = false;
  hasMoreData = true;
  searchTerm: string = '';

  constructor(
    private stockPricingService: StockPricingService,
    private router: Router
  ) {}

  ngOnInit() {

  }
  getChange(stock: StockPricing): number {
    return stock.close - stock.open;
  }

  getChangeText(stock: StockPricing): string {
    const change = this.getChange(stock);
    const changePercent = (change / stock.open) * 100;
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)} (${sign}${changePercent.toFixed(2)}%)`;
  }

  formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }

  onSearch() {
    this.currentPage = 1; // Reset to first page when searching
    if (this.searchTerm.trim()) {
      this.searchStocks();
    } 
  }

  onSearchClear() {
    this.searchTerm = '';
  }

  private searchStocks() {
    this.loading = true;
    this.stockPricingService.searchBySymbol(this.searchTerm, this.currentPage, this.pageSize)
      .subscribe((response) => {
          this.stocks = response.data;
          this.totalItems = response.totalItems;
          this.totalPages = response.totalPages;
          this.currentPage = response.currentPage;
          this.hasMoreData = this.currentPage < this.totalPages;
          this.loading = false;
        });
  }

  navigateToDetail(symbol: string) {
    this.router.navigate(['/stock', symbol]);
  }
}

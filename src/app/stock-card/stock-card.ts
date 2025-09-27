import { Component } from '@angular/core';
import { IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-stock-card',
  imports: [IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle],
  templateUrl: './stock-card.html',
  styleUrl: './stock-card.css'
})
export class StockCard {

}

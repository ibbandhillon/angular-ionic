import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainPage } from "./main-page/main-page";
import { IonApp } from "@ionic/angular/standalone";
import { register } from 'swiper/element';


register();


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainPage, IonApp],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('stake-test');
}

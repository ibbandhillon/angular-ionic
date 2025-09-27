import { Routes } from '@angular/router';
import { Invest } from './invest/invest';
import { MainPage } from './main-page/main-page';
import { Discover } from './discover/discover';

export const routes: Routes = [
     {
    path: "tabs",
    component: MainPage,
    children: [
      {
        path: "invest",
        component: Invest,
      },
      {
        path: "discover",
        component: Discover,
      },
      {
        path: "",
        redirectTo: "/tabs/invest",
        pathMatch: "full",
      },
    ],
  },
  
  { path: "", redirectTo: "/tabs/invest", pathMatch: "full" },

  { path: "**", redirectTo: "/tabs/invest" },
];

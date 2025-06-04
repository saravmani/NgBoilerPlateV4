import { Routes } from '@angular/router';
import { StocksComponent } from './features/stocks/stocks.component';
import { MutualFundsComponent } from './features/mutual-funds/mutual-funds.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MyNotesComponent } from './features/my-notes/my-notes.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'stocks', component: StocksComponent },
  { path: 'mutual-funds', component: MutualFundsComponent },
  { path: 'my-notes', component: MyNotesComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

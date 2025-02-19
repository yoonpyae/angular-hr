import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StateComponent } from './pages/state/state.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'state', component: StateComponent },
];

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StateComponent } from './pages/state/state.component';
import { EntryComponent } from './pages/state/entry/entry.component';
import { PolicyComponent } from './pages/policy/policy.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'state',

    children: [
      {
        path: '',
        component: StateComponent,
      },
      {
        path: 'entry/:id',
        component: EntryComponent,
      },
      {
        path: 'entry',
        component: EntryComponent,
      },
    ],
  },
  { path: 'policy', component: PolicyComponent },
];

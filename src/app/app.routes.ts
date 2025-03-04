import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StateComponent } from './pages/state/state.component';
import { EntryComponent } from './pages/state/entry/entry.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { PolicyEntryComponent } from './pages/policy/policyentry/policyentry.component';
import { Component } from '@angular/core';
import { AllowanceComponent } from './pages/allowance/allowance.component';
import { AllowanceEntryComponent } from './pages/allowance/allowance-entry/allowance-entry.component';
import { DepartmentComponent } from './pages/department/department.component';
import { DeductionComponent } from './pages/deduction/deduction.component';
import { DeductionEntryComponent } from './pages/deduction/deduction-entry/deduction-entry.component';

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
  {
    path: 'policy',
    children: [
      {
        path: '',
        component: PolicyComponent,
      },
      {
        path: 'entry/:id',
        component: PolicyEntryComponent,
      },
      {
        path: 'entry',
        component: PolicyEntryComponent,
      },
    ],
  },
  {
    path: 'allowance',
    children: [
      {
        path: '',
        component: AllowanceComponent,
      },
      { path: 'entry/:id', component: AllowanceEntryComponent },
      {
        path: 'entry',
        component: AllowanceEntryComponent,
      },
    ],
  },
  { path: 'department', component: DepartmentComponent },
  {
    path: 'deduction',
    children: [
      {
        path: '',
        component: DeductionComponent,
      },
      {
        path: 'entry',
        component: DeductionEntryComponent,
      },
      {
        path: 'entry/:id',
        component: DeductionEntryComponent,
      },
    ],
  },
];

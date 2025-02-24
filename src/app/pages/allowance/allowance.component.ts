import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import { AllowanceModel } from '../../core/models/allowance.model';
import { AllowanceService } from '../../core/services/allowance.service';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-allowance',
  imports: [
    RouterModule,
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    CommonModule,
    SelectModule,
    MultiSelectModule,
    TagModule,
  ],
  templateUrl: './allowance.component.html',
  styleUrl: './allowance.component.scss',
})
export class AllowanceComponent implements OnInit {
  selectedAllowance!: AllowanceModel;
  allowances: AllowanceModel[] = [];
  loading: boolean = true;

  activityValues: number[] = [0, 100];
  constructor(
    private allowanceService: AllowanceService,
    private rout: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
    console.log('Allowances:', this.allowances); // Check if data is present
  }

  loadData(): void {
    this.allowanceService.get().subscribe((res) => {
      this.allowances = res.data as AllowanceModel[];
    });
  }

  update(allowance: AllowanceModel): void {
    this.selectedAllowance = allowance;
    this.rout.navigate([
      '/allowance/entry',
      this.selectedAllowance.allowanceId,
    ]);
  }

  delete(allowance: AllowanceModel): void {
    this.selectedAllowance = allowance;
    if (this.selectedAllowance !== null) {
      this.allowanceService
        .delete(this.selectedAllowance.allowanceId)
        .subscribe((res) => {
          this.loadData();
        });
    }
  }

  clear(table: Table) {
    table.clear();
  }

  getSeverity(status: boolean) {
    switch (status) {
      case true:
        return 'success';
      case false:
        return 'danger';
    }
  }
}

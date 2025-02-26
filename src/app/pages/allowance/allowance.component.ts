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
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

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
    ToastModule,
  ],
  templateUrl: './allowance.component.html',
  styleUrl: './allowance.component.scss',
  providers: [MessageService],
})
export class AllowanceComponent implements OnInit {
  selectedAllowance!: AllowanceModel;
  allowances: AllowanceModel[] = [];
  loading: boolean = true;
  totalAllowances: number = 0;

  activityValues: number[] = [0, 100];
  constructor(
    private allowanceService: AllowanceService,
    private rout: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadData();
    console.log('Allowances:', this.allowances); // Check if data is present
  }

  loadData(): void {
    this.allowanceService.get().subscribe((res) => {
      this.allowances = res.data as AllowanceModel[];
      this.totalAllowances = this.allowances.length; // Count total allowances
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

    if (
      confirm(`Are you sure you want to delete ${allowance.allowanceName}?`)
    ) {
      this.allowanceService
        .delete(this.selectedAllowance.allowanceId)
        .subscribe(
          (res) => {
            this.loadData();
            this.messageService.add({
              severity: 'success',
              summary: 'Deleted',
              detail: `Allowance ${allowance.allowanceName} has been deleted.`,
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Failed to delete ${allowance.allowanceName}.`,
            });
          }
        );
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

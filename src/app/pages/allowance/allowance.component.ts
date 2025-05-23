import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { Select, SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import {
  AllowanceModel,
  ViAllowanceModel,
} from '../../core/models/allowance.model';
import { AllowanceService } from '../../core/services/allowance.service';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

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
    DropdownModule,
    FormsModule,
  ],
  templateUrl: './allowance.component.html',
  styleUrl: './allowance.component.scss',
  providers: [MessageService],
})
export class AllowanceComponent implements OnInit {
  selectedAllowance!: AllowanceModel;
  allowances: AllowanceModel[] = [];
  viAllowances: ViAllowanceModel[] = [];
  loading: boolean = true;
  totalAllowances: number = 0;
  mostCommonCompanyId: string = '';
  trueStatusCount: number = 0;
  falseStatusCount: number = 0;

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
      this.viAllowances = res.data as ViAllowanceModel[];
      this.totalAllowances = this.allowances.length; // Count total allowances
      this.mostCommonCompanyId = this.findMostCommonCompanyId(); // Find most common companyId
      this.trueStatusCount = this.countTrueStatus(); // Count true statuses
      this.falseStatusCount = this.countFalseStatus();
    });
  }

  findMostCommonCompanyId(): string {
    const companyIdCount: { [key: string]: number } = {};
    let maxCount = 0;
    let mostCommonCompanyId = '';

    this.allowances.forEach((allowance) => {
      const companyId = allowance.companyId;
      if (companyIdCount[companyId]) {
        companyIdCount[companyId]++;
      } else {
        companyIdCount[companyId] = 1;
      }

      if (companyIdCount[companyId] > maxCount) {
        maxCount = companyIdCount[companyId];
        mostCommonCompanyId = companyId;
      }
    });

    return mostCommonCompanyId;
  }

  countTrueStatus(): number {
    return this.allowances.filter((allowance) => allowance.status === true)
      .length;
  }

  countFalseStatus(): number {
    return this.allowances.filter((allowance) => allowance.status === false)
      .length;
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

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
import { PolicyModel } from '../../core/models/policy.model';
import { PolicyService } from '../../core/services/policy.service';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-policy',
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
    TableModule,
    ConfirmDialog,
    ToastModule,
  ],
  templateUrl: './policy.component.html',
  styleUrl: './policy.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class PolicyComponent implements OnInit {
  selectedPolicy!: PolicyModel;
  policies: PolicyModel[] = [];
  loading: boolean = true;

  activityValues: number[] = [0, 100];
  constructor(
    private policyService: PolicyService,
    private rout: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.policyService.get().subscribe((res) => {
      let result = res.data;
      this.policies = result.policies as PolicyModel[];
    });
  }

  update(policy: PolicyModel): void {
    this.selectedPolicy = policy;
    this.rout.navigate(['/policy/entry', this.selectedPolicy.id]);
  }

  delete(policy: PolicyModel): void {
    this.selectedPolicy = policy; // Store selected policy before confirmation

    this.confirmationService.confirm({
      header: 'Are you sure?',
      message: 'Please confirm to proceed.',
      accept: () => {
        this.policyService.delete(policy.id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Deleted',
            detail: `Policy ${policy.policyType} has been deleted.`,
          });
          this.loadData(); // Reload the data after successful deletion
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'Policy deletion was cancelled.',
        });
      },
    });
  }

  clear(table: Table) {
    table.clear();
  }
}

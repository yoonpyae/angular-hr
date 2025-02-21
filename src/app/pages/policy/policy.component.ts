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
  ],
  templateUrl: './policy.component.html',
  styleUrl: './policy.component.scss',
})
export class PolicyComponent implements OnInit {
  selectedPolicy!: PolicyModel;
  policies: PolicyModel[] = [];
  loading: boolean = true;

  activityValues: number[] = [0, 100];
  constructor(private policyService: PolicyService, private rout: Router) {}

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
    this.selectedPolicy = policy;
    if (this.selectedPolicy !== null) {
      this.policyService.delete(this.selectedPolicy.id).subscribe((res) => {
        this.loadData();
      });
    }
  }

  clear(table: Table) {
    table.clear();
  }
}

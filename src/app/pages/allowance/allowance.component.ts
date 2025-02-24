import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { AllowanceModel } from '../../core/models/allowance.model';
import { PolicyService } from '../../core/services/policy.service';

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
    TableModule,
  ],
  templateUrl: './allowance.component.html',
  styleUrl: './allowance.component.scss',
})
export class AllowanceComponent implements OnInit {
  selectedAllowance!: AllowanceModel;
  allowances: AllowanceModel[] = [];
  loading: boolean = true;

  activityValues: number[] = [0, 100];
  constructor(private policyService: PolicyService, private rout: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.policyService.get().subscribe((res) => {
      let result = res.data;
      this.allowances = result.allowances as AllowanceModel[];
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import {
  DeductionModel,
  ViDeductionModel,
} from '../../core/models/deduction.model';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DeductionService } from '../../core/services/deduction.service';
import { DragDropModule } from 'primeng/dragdrop';
import { ToolbarModule } from 'primeng/toolbar';
import { UndoIcon } from 'primeng/icons';

@Component({
  selector: 'app-deduction',
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
    ConfirmDialog,
    DragDropModule,
    ToolbarModule,
  ],
  templateUrl: './deduction.component.html',
  styleUrl: './deduction.component.scss',
  providers: [MessageService, ConfirmationService],
})
export class DeductionComponent implements OnInit {
  deduction: ViDeductionModel[] = [];
  selectedDeduction!: ViDeductionModel;
  loading: boolean = true;

  constructor(
    private deductionService: DeductionService,
    private route: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadData();
    console.log('Deductions:', this.deduction);
  }

  loadData(): void {
    this.deductionService.get().subscribe({
      next: (res) => {
        this.deduction = res.data as ViDeductionModel[];
      },
      error: (err) => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  update(deduction: DeductionModel): void {
    this.route.navigate(['/deduction/entry', deduction.deductionId]);
  }

  delete(deduction: DeductionModel): void {
    this.confirmationService.confirm({
      message: 'Are You Sure Want To Delete?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deductionService.delete(deduction.deductionId).subscribe((res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Confirmed',
            detail: `Deduction ${deduction.deductionName} has been deleted.`,
          });
          this.loadData();
          //deselect
          this.selectedDeduction = null as any;
        });
      },
      reject: () => {
        this.selectedDeduction = null as any;
      },
      key: 'positionDialog',
    });
  }

  getSeverity(status: boolean) {
    switch (status) {
      case true:
        return 'success';
      case false:
        return 'danger';
    }
  }

  onReorder(event: any): void {
    // Update the deduction array with the new order
    this.deduction = [...event.value];

    // Log the new order for debugging
    console.log('Reordered Deductions:', this.deduction);
  }
}

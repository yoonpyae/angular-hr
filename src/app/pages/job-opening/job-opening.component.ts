import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
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
  JobOpeningModel,
  ViJobOpeningModel,
} from '../../core/models/job-opening.model';
import { JobOpeningService } from '../../core/services/job-opening.service';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-job-opening',
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
    Skeleton,
  ],

  templateUrl: './job-opening.component.html',
  styleUrl: './job-opening.component.scss',
  providers: [MessageService, ConfirmationService],
})
export class JobOpeningComponent implements OnInit {
  jobOpening: ViJobOpeningModel[] = [];
  selectedJobOpeing!: ViJobOpeningModel;
  isloading: boolean = true;

  constructor(
    private jobOpeningService: JobOpeningService,
    private route: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadData();
    console.log('JobOpening:', this.jobOpening);
  }

  loadData() {
    this.jobOpeningService.get().subscribe({
      next: (res) => {
        this.jobOpening = res.data as ViJobOpeningModel[];
        console.log(this.jobOpening);
      },
      error: (err) => {
        this.isloading = false;
      },
      complete: () => {
        this.isloading = false;
      },
    });
  }

  update(jobOpening: JobOpeningModel): void {
    this.route.navigate(['/jobOpening/entry', jobOpening.id]);
  }

  delete(jobOpening: JobOpeningModel): void {
    this.confirmationService.confirm({
      message: 'Are You Sure Want To Delete?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.jobOpeningService.delete(jobOpening.id).subscribe((res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Confirmed',
            detail: `jobOpening ${jobOpening.title} has been deleted.`,
          });
          this.loadData();
          //deselect
          this.selectedJobOpeing = null as any;
        });
      },
      reject: () => {
        this.selectedJobOpeing = null as any;
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
}

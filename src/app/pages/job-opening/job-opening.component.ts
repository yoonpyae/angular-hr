import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import {
  JobOpeningModel,
  ViJobOpeningModel,
} from '../../core/models/job-opening.model';
import { JobOpeningService } from '../../core/services/job-opening.service';
import { Skeleton } from 'primeng/skeleton';
import { Observable } from 'rxjs';
import { DarkModeToggleComponent } from '../dark-mode-toggle/dark-mode-toggle.component';

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
    DarkModeToggleComponent,
  ],

  templateUrl: './job-opening.component.html',
  styleUrl: './job-opening.component.scss',
  providers: [MessageService, ConfirmationService],
})
export class JobOpeningComponent implements OnInit {
  jobOpening: ViJobOpeningModel[] = [];
  selectedJobOpeing: ViJobOpeningModel[] = [];
  isloading: boolean = true;
  @ViewChild('dt1') dt1!: Table;

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

  deleteSelected() {
    if (!this.selectedJobOpeing || this.selectedJobOpeing.length === 0) return;

    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${this.selectedJobOpeing.length} selected job openings?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        const deleteObservables: Observable<any>[] = this.selectedJobOpeing.map(
          (job) => this.jobOpeningService.delete(job.id)
        );

        Promise.all(deleteObservables.map((obs) => obs.toPromise())).then(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Deleted',
              detail: `${this.selectedJobOpeing.length} job openings have been deleted.`,
            });

            this.loadData(); // Refresh the list after deletion
            // this.selectedJobOpeing = []; // Clear selection
          }
        );
      },
      reject: () => {
        // this.selectedJobOpeing = [];
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

  exportCSVManually() {
    if (this.jobOpening && this.jobOpening.length > 0) {
      const csvData = this.convertToCSV(this.jobOpening);
      this.downloadCSV(csvData, 'job_opening_list.csv');
    } else {
      console.error('No data available to export');
    }
  }

  convertToCSV(data: ViJobOpeningModel[]): string {
    const headers = [
      'Title',
      'Description',
      'No of Applicants',
      'Start On',
      'End On',
      'Company Name',
      'Branch Name',
      'Dept Name',
      'Position Name',
      'Opening Status',
      'Created On',
      'Created By',
      'Updated On',
      'Updated By',
      'Remark',
    ];

    const rows = data.map((item) => [
      item.title,
      item.description,
      item.noOfApplicants,
      item.startOn,
      item.endOn,
      item.companyName,
      item.branchName,
      item.deptName,
      item.positionName,
      item.openingStatus ? 'Open' : 'Closed', // Adjust this as needed
      item.createdOn,
      item.createdBy,
      item.updatedOn,
      item.updatedBy,
      item.remark,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(','))
      .join('\n');

    return csvContent;
  }

  downloadCSV(csvData: string, filename: string) {
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

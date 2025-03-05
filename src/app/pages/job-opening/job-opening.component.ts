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
import { ViJobOpeningModel } from '../../core/models/job-opening.model';
import { JobOpeningService } from '../../core/services/job-opening.service';

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

  getSeverity(status: boolean) {
    switch (status) {
      case true:
        return 'success';
      case false:
        return 'danger';
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
export class JobOpeningComponent {
  jobOpening: ViJobOpeningModel[] = [];
  selectedJobOpeing!: ViJobOpeningModel;
  isloading: boolean = true;
}

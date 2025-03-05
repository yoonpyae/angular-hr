import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { BranchModel } from '../../../core/models/branch.model';
import { ViCompanyModel } from '../../../core/models/company.model';
import { DepartmentModel } from '../../../core/models/department.model';
import { PositionModel } from '../../../core/models/position.model';
import { JobOpeningModel } from '../../../core/models/job-opening.model';
import { JobOpeningService } from '../../../core/services/job-opening.service';
import { PositionService } from '../../../core/services/position.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from '../../../core/services/branch.service';
import { CompanyService } from '../../../core/services/company.service';
import { DepartmentService } from '../../../core/services/department.service';

@Component({
  selector: 'app-job-opening-entry',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    ToggleSwitchModule,
    ProgressSpinnerModule,
    EditorModule,
    SelectModule,
  ],
  templateUrl: './job-opening-entry.component.html',
  styleUrl: './job-opening-entry.component.scss',
  providers: [DatePipe, MessageService],
})
export class JobOpeningEntryComponent implements OnInit {
  companies: ViCompanyModel[] = [];
  selectedCompany!: ViCompanyModel;

  branches: BranchModel[] = [];
  selectedBranch!: BranchModel;

  depts: DepartmentModel[] = [];
  selectedDept!: DepartmentModel;

  positions: PositionModel[] = [];
  selectedPosition!: PositionModel;

  joID: number = 0;
  model!: JobOpeningModel;
  isEdit: boolean = false;
  isSubmitting: boolean = false;
  modalVisible: boolean = false;
  checked: boolean = false;
  loading: boolean = false;

  constructor(
    private jobOpeningService: JobOpeningService,
    private companyService: CompanyService,
    private branchService: BranchService,
    private deptService: DepartmentService,
    private positionService: PositionService,
    private route: ActivatedRoute,
    private datepipe: DatePipe,
    private messageService: MessageService,
    private router: Router
  ) {}

  private formBuilder = inject(FormBuilder);
  jobOpeingForm = this.formBuilder.group({
    id: [0],
    title: ['', Validators.required],
    description: [''],
    noOfApplicants: [0],
    startOn: [''],
    endOn: [''],
    companyId: ['', Validators.required],
    branchId: [0, Validators.required],
    deptId: [0, Validators.required],
    positionId: [0, Validators.required],
    openingStatus: [true],
    createdOn: [''],
    createdBy: [''],
    updatedOn: [''],
    updatedBy: [''],
    deletedOn: [''],
    deletedBy: [''],
    remark: [''],
  });

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}

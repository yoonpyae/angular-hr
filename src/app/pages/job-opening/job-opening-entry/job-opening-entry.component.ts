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
    this.jobOpeingForm.get('openingStatus')?.valueChanges.subscribe((value) => {
      console.log('openingStatus changed:', value);
    });

    if (!this.isEdit)
      this.joID = parseInt(this.route.snapshot.paramMap.get('id') ?? '');

    if (this.joID > 0) {
      this.isEdit = true;
      this.jobOpeningService.getbyid(this.joID).subscribe((res) => {
        this.model = res.data as JobOpeningModel;
        console.log(this.model);

        this.jobOpeingForm.controls.id.setValue(this.model.id);
        this.jobOpeingForm.controls.title.setValue(this.model.title);
        this.jobOpeingForm.controls.description.setValue(
          this.model.description
        );
        this.jobOpeingForm.controls.noOfApplicants.setValue(
          this.model.noOfApplicants
        );
        this.jobOpeingForm.controls.startOn.setValue(
          this.model.startOn
            ? this.datepipe.transform(this.model.startOn, 'yyyy-MM-dd')
            : null
        );
        this.jobOpeingForm.controls.endOn.setValue(
          this.model.endOn
            ? this.datepipe.transform(this.model.endOn, 'yyyy-MM-dd')
            : null
        );
        this.jobOpeingForm.controls.companyId.setValue(this.model.companyId);
        this.jobOpeingForm.controls.branchId.setValue(this.model.branchId);
        this.jobOpeingForm.controls.deptId.setValue(this.model.deptId);
        this.jobOpeingForm.controls.positionId.setValue(this.model.positionId);
        this.jobOpeingForm.controls.openingStatus.setValue(
          this.model.openingStatus
        );
        this.jobOpeingForm.controls.createdOn.setValue(
          this.model.createdOn
            ? this.datepipe.transform(this.model.createdOn, 'yyyy-MM-dd')
            : null
        );

        this.jobOpeingForm.controls.createdBy.setValue(this.model.createdBy);
        this.jobOpeingForm.controls.updatedOn.setValue(
          this.model.updatedOn
            ? this.datepipe.transform(this.model.updatedOn, 'yyyy-MM-dd')
            : null
        );

        this.jobOpeingForm.controls.updatedBy.setValue(this.model.updatedBy);
        this.jobOpeingForm.controls.deletedOn.setValue(
          this.model.deletedOn
            ? this.datepipe.transform(this.model.deletedOn, 'yyyy-MM-dd')
            : null
        );
        this.jobOpeingForm.controls.deletedBy.setValue(this.model.deletedBy);
        this.jobOpeingForm.controls.remark.setValue(this.model.remark);

        // Fetch companies and set selected company
        this.getCompanies();
      });
    } else {
      // Fetch companies if not editing
      this.getCompanies();
    }
    if (!this.isEdit) this.jobOpeingForm.reset();
  }

  getCompanies() {
    this.companyService.get().subscribe({
      next: (res) => {
        this.companies = res.data.companies as ViCompanyModel[];
        if (this.isEdit) {
          this.selectedCompany = this.companies.filter(
            (x) => x.companyId == this.model.companyId
          )[0];
          this.onCompanyChange();
        }
      },
      error: () => {},
    });
  }

  onCompanyChange(): void {
    if (this.selectedCompany !== undefined && this.selectedCompany !== null) {
      this.jobOpeingForm.controls.companyId.setValue(
        this.selectedCompany.companyId
      );
      this.getBranches(this.selectedCompany.companyId);
    }
  }

  // Branch
  getBranches(companyId: string): void {
    this.branchService.getByCompanyID(companyId).subscribe({
      next: (res) => {
        this.branches = res.data as BranchModel[];
        if (this.isEdit) {
          this.selectedBranch = this.branches.filter(
            (x) => x.branchId == this.model.branchId
          )[0];
          this.onBranchChange();
        }
      },
      error: () => {},
    });
  }

  onBranchChange(): void {
    if (this.selectedBranch !== undefined && this.selectedBranch !== null) {
      this.jobOpeingForm.controls.branchId.setValue(
        this.selectedBranch.branchId
      );

      this.getDepartments(
        this.selectedBranch.branchId,
        this.selectedCompany.companyId
      );
    }
  }

  // #region Department
  getDepartments(branchId: number, companyId: string): void {
    this.deptService.getbyBranchIdbyCompanyId(branchId, companyId).subscribe({
      next: (res) => {
        this.depts = res.data as DepartmentModel[];
        if (this.isEdit) {
          this.selectedDept = this.depts.filter(
            (x) => x.deptId == this.model.deptId
          )[0];
          this.onDeptChange();
        }
      },
    });
  }

  onDeptChange() {
    if (this.selectedDept !== undefined && this.selectedDept !== null) {
      this.jobOpeingForm.controls.deptId.setValue(this.selectedDept.deptId);

      this.getPositions(
        this.selectedCompany.companyId,
        this.selectedBranch.branchId,
        this.selectedDept.deptId
      );
    }
  }
  // #endregion

  // Position
  getPositions(companyId: string, branchId: number, deptId: number) {
    this.positionService
      .getbyBranchIdbyCompanyIdbyDeptId(companyId, branchId, deptId)
      .subscribe({
        next: (res) => {
          this.positions = res.data as PositionModel[];
          if (this.isEdit) {
            this.selectedPosition = this.positions.filter(
              (x) => x.positionId == this.model.positionId
            )[0];
            this.onPositionChange();
          }
        },
      });
  }

  onPositionChange() {
    if (this.selectedPosition !== undefined && this.selectedPosition !== null) {
      this.jobOpeingForm.controls.positionId.setValue(
        this.selectedPosition.positionId
      );
    }
  }
}

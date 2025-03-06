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
import { ViCompanyModel } from '../../../core/models/company.model';
import { BranchModel } from '../../../core/models/branch.model';
import { DepartmentModel } from '../../../core/models/department.model';
import { DeductionModel } from '../../../core/models/deduction.model';
import { DeductionService } from '../../../core/services/deduction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from '../../../core/services/branch.service';
import { CompanyService } from '../../../core/services/company.service';
import { DepartmentService } from '../../../core/services/department.service';

@Component({
  selector: 'app-deduction-entry',
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
  templateUrl: './deduction-entry.component.html',
  styleUrl: './deduction-entry.component.scss',
  providers: [DatePipe, MessageService],
})
export class DeductionEntryComponent implements OnInit {
  companies: ViCompanyModel[] = [];
  selectedCompany!: ViCompanyModel;

  branches: BranchModel[] = [];
  selectedBranch!: BranchModel;

  depts: DepartmentModel[] = [];
  selectedDept!: DepartmentModel;

  deductionID: number = 0;
  model!: DeductionModel;
  isEdit: boolean = false;
  isSubmitting: boolean = false;
  modalVisible: boolean = false;
  checked: boolean = false;
  loading: boolean = false;

  constructor(
    private deductionService: DeductionService,
    private companyService: CompanyService,
    private branchService: BranchService,
    private deptService: DepartmentService,
    private route: ActivatedRoute,
    private datepipe: DatePipe,
    private messageService: MessageService,
    private router: Router
  ) {}

  private formBuilder = inject(FormBuilder);
  deductionForm = this.formBuilder.group({
    deductionId: [0],
    deductionName: ['', Validators.required],
    companyId: ['', Validators.required],
    branchId: [0, Validators.required], // Initially disabled
    deptId: [0, Validators.required], // Initially disabled
    description: [''],
    isDefault: [true],
    status: [true],
    createdOn: [''],
    createdBy: [''],
    updatedOn: [''],
    updatedBy: [''],
    deletedOn: [''],
    deletedBy: [''],
    remark: [''],
  });

  ngOnInit(): void {
    this.deductionForm.get('status')?.valueChanges.subscribe((value) => {
      console.log('Status changed:', value);
    });

    if (!this.isEdit)
      this.deductionID = parseInt(this.route.snapshot.paramMap.get('id') ?? '');

    if (this.deductionID > 0) {
      this.isEdit = true;
      this.deductionService.getByID(this.deductionID).subscribe((res) => {
        this.model = res.data as DeductionModel;
        console.log(this.model);

        this.deductionForm.controls.deductionId.setValue(
          this.model.deductionId
        );
        this.deductionForm.controls.deductionName.setValue(
          this.model.deductionName
        );
        this.deductionForm.controls.companyId.setValue(this.model.companyId);
        this.deductionForm.controls.branchId.setValue(this.model.branchId);
        this.deductionForm.controls.deptId.setValue(this.model.deptId);
        this.deductionForm.controls.description.setValue(
          this.model.description
        );
        this.deductionForm.controls.status.setValue(this.model.status);
        this.deductionForm.controls.createdOn.setValue(
          this.model.createdOn
            ? this.datepipe.transform(this.model.createdOn, 'yyyy-MM-dd')
            : null
        );

        this.deductionForm.controls.createdBy.setValue(this.model.createdBy);
        this.deductionForm.controls.updatedOn.setValue(
          this.model.updatedOn
            ? this.datepipe.transform(this.model.updatedOn, 'yyyy-MM-dd')
            : null
        );

        this.deductionForm.controls.updatedBy.setValue(this.model.updatedBy);
        this.deductionForm.controls.deletedOn.setValue(
          this.model.deletedOn
            ? this.datepipe.transform(this.model.deletedOn, 'yyyy-MM-dd')
            : null
        );
        this.deductionForm.controls.deletedBy.setValue(this.model.deletedBy);
        this.deductionForm.controls.remark.setValue(this.model.remark);

        // Fetch companies and set selected company
        this.getCompanies();
      });
    } else {
      // Fetch companies if not editing
      this.getCompanies();
    }
    if (!this.isEdit) this.deductionForm.reset();
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
      this.deductionForm.controls.companyId.setValue(
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
      this.deductionForm.controls.branchId.setValue(
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
      this.deductionForm.controls.deptId.setValue(this.selectedDept.deptId);
    }
  }
  // #endregion

  submit(): void {
    console.log('Form Submitted:', this.deductionForm.value);
    if (this.deductionForm.valid) {
      var model: DeductionModel = {
        deductionId: this.deductionForm.controls.deductionId.value ?? 0,
        deductionName: this.deductionForm.controls.deductionName.value ?? '',
        companyId: this.deductionForm.controls.companyId.value ?? '',
        branchId: this.deductionForm.controls.branchId.value ?? 0,
        deptId: this.deductionForm.controls.deptId.value ?? 0,
        isDefault: this.deductionForm.controls.isDefault.value ?? true,
        description: this.deductionForm.controls.description.value ?? '',
        status: this.deductionForm.controls.status.value === true,
        createdOn: this.datepipe.transform(
          this.deductionForm.controls.createdOn.value,
          'yyyy-MM-dd'
        ),
        createdBy: this.deductionForm.controls.createdBy.value ?? '',
        updatedOn: this.datepipe.transform(
          this.deductionForm.controls.updatedOn.value,
          'yyyy-MM-dd'
        ),
        updatedBy: this.deductionForm.controls.updatedBy.value ?? '',
        deletedOn: this.datepipe.transform(
          this.deductionForm.controls.deletedOn.value,
          'yyyy-MM-dd'
        ),
        deletedBy: this.deductionForm.controls.deletedBy.value ?? '',
        remark: this.deductionForm.controls.remark.value ?? '',
      };
      if (!this.isEdit) {
        model.deductionId = 0;
        model.createdOn = this.datepipe.transform(
          new Date(),
          'yyyy-MM-ddTHH:mm:ss'
        );
        model.createdBy = 'Admin';

        this.isSubmitting = true;
        this.deductionService.create(model).subscribe({
          next: (res) => {
            console.log('API Response:', res);
            if (res.success) {
              this.modalVisible = false;

              this.messageService.add({
                key: 'globalMessage',
                severity: 'info',
                summary: 'Success',
                detail: res.message.toString(),
              });

              this.isSubmitting = false;
              this.router.navigate(['/deduction']); // Navigate to deduction page
            }
          },
          error: (err) => {
            this.isSubmitting = false;
            console.error('Error:', err);
          },
        });
      } else {
        model.updatedOn = this.datepipe.transform(
          new Date(),
          'yyyy-MM-ddTHH:mm:ss'
        );
        model.updatedBy = 'Admin';
        this.deductionService.update(this.deductionID, model).subscribe({
          next: (res) => {
            console.log('API Response:', res);
            if (res.success) {
              this.modalVisible = false;

              this.messageService.add({
                key: 'globalMessage',
                severity: 'info',
                summary: 'Success',
                detail: res.message.toString(),
              });

              this.isSubmitting = false;
              this.router.navigate(['/deduction']); // Navigate to deduction page
            }
          },
          error: (err) => {
            this.isSubmitting = false;
            console.error('Error:', err);
          },
        });
      }
    } else {
      Object.keys(this.deductionForm.controls).forEach((field) => {
        const control = this.deductionForm.get(field);
        control?.markAsDirty({ onlySelf: true });
      });
    }
  }
}

import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { AllowanceModel } from '../../../core/models/allowance.model';
import { AllowanceService } from '../../../core/services/allowance.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-allowance-entry',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
  ],
  templateUrl: './allowance-entry.component.html',
  styleUrl: './allowance-entry.component.scss',
  providers: [DatePipe, MessageService],
})
export class AllowanceEntryComponent implements OnInit {
  allowanceID: number = 0;
  model!: AllowanceModel;

  constructor(
    private allowanceService: AllowanceService,
    private route: ActivatedRoute,
    private datepipe: DatePipe,
    private messageService: MessageService
  ) {}

  private formBuilder = inject(FormBuilder);
  allowanceForm = this.formBuilder.group({
    allowanceId: [0],
    companyId: [''],
    branchId: [0],
    deptId: [0],
    positionId: [0],
    allowanceName: [''],
    description: [''],
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
    this.allowanceID = parseInt(this.route.snapshot.paramMap.get('id') ?? '');
    if (this.allowanceID > 0) {
      this.allowanceService.getByID(this.allowanceID).subscribe((res) => {
        this.model = res.data as AllowanceModel;
        console.log(this.model);

        this.allowanceForm.controls.allowanceId.setValue(
          this.model.allowanceId
        );
        this.allowanceForm.controls.allowanceId.disable();
        this.allowanceForm.controls.companyId.setValue(this.model.companyId);
        this.allowanceForm.controls.branchId.setValue(this.model.branchId);
        this.allowanceForm.controls.companyId.setValue(this.model.companyId);
        this.allowanceForm.controls.deptId.setValue(this.model.deptId);
        this.allowanceForm.controls.positionId.setValue(this.model.positionId);
        this.allowanceForm.controls.allowanceName.setValue(
          this.model.allowanceName
        );
        this.allowanceForm.controls.description.setValue(
          this.model.description
        );
        this.allowanceForm.controls.status.setValue(this.model.status);
        this.allowanceForm.controls.createdOn.setValue(
          this.model.createdOn
            ? this.datepipe.transform(this.model.createdOn, 'yyyy-MM-dd')
            : null
        );

        this.allowanceForm.controls.createdBy.setValue(this.model.createdBy);
        this.allowanceForm.controls.updatedOn.setValue(
          this.model.updatedOn
            ? this.datepipe.transform(this.model.updatedOn, 'yyyy-MM-dd')
            : null
        );

        this.allowanceForm.controls.updatedBy.setValue(this.model.updatedBy);
        this.allowanceForm.controls.deletedOn.setValue(
          this.model.deletedOn
            ? this.datepipe.transform(this.model.deletedOn, 'yyyy-MM-dd')
            : null
        );
        this.allowanceForm.controls.deletedBy.setValue(this.model.deletedBy);
        this.allowanceForm.controls.remark.setValue(this.model.remark);
      });
    }
  }

  submit(): void {
    let createdOn = this.datepipe.transform(
      this.allowanceForm.controls.createdOn.value,
      'yyyy-MM-dd'
    );

    let updatedOn = this.datepipe.transform(
      this.allowanceForm.controls.updatedOn.value,
      'yyyy-MM-dd'
    );

    let deletedOn = this.datepipe.transform(
      this.allowanceForm.controls.deletedOn.value,
      'yyyy-MM-dd'
    );

    var model: AllowanceModel = {
      allowanceId: this.allowanceForm.controls.allowanceId.value ?? 0,
      companyId: this.allowanceForm.controls.companyId.value ?? '',
      branchId: this.allowanceForm.controls.branchId.value ?? 0,
      deptId: this.allowanceForm.controls.deptId.value ?? 0,
      positionId: this.allowanceForm.controls.positionId.value ?? 0,
      allowanceName: this.allowanceForm.controls.allowanceName.value ?? '',
      description: this.allowanceForm.controls.description.value ?? '',
      status: this.allowanceForm.controls.status.value ?? true,
      createdOn: createdOn,
      createdBy: this.allowanceForm.controls.createdBy.value ?? '',
      updatedOn: updatedOn,
      updatedBy: this.allowanceForm.controls.updatedBy.value ?? '',
      deletedOn: deletedOn,
      deletedBy: this.allowanceForm.controls.deletedBy.value ?? '',
      remark: this.allowanceForm.controls.remark.value ?? '',
    };

    if (this.allowanceID > 0) {
      this.allowanceService.update(this.allowanceID, model).subscribe(
        (res) => {
          console.log(res);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Allowance updated successfully!',
          });
        },
        (err) => {
          console.error('Error updating allowance:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update allowance!',
          });
        }
      );
    } else {
      this.allowanceService.create(model).subscribe(
        (res) => {
          console.log('Form Submitted:', this.allowanceForm.value, res);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'allowance created successfully!',
          });
        },
        (err) => {
          console.error('Error creating allowance:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create allowance!',
          });
        }
      );
    }

    // Optionally reset the form after success
    this.allowanceForm.reset();
  }
}

//   submit(): void {
//     let createdOn = this.datepipe.transform(
//       this.allowanceForm.controls.createdOn.value,
//       'yyyy-MM-dd'
//     );

//     let updatedOn = this.datepipe.transform(
//       this.allowanceForm.controls.updatedOn.value,
//       'yyyy-MM-dd'
//     );

//     let deletedOn = this.datepipe.transform(
//       this.allowanceForm.controls.deletedOn.value,
//       'yyyy-MM-dd'
//     );
//     var model: AllowanceModel = {
//       allowanceId: this.allowanceForm.controls.allowanceId.value ?? 0,
//       companyId: this.allowanceForm.controls.companyId.value ?? '',
//       branchId: this.allowanceForm.controls.branchId.value ?? 0,
//       deptId: this.allowanceForm.controls.deptId.value ?? 0,
//       positionId: this.allowanceForm.controls.positionId.value ?? 0,
//       allowanceName: this.allowanceForm.controls.allowanceName.value ?? '',
//       description: this.allowanceForm.controls.description.value ?? '',
//       status: this.allowanceForm.controls.status.value ?? true,
//       createdOn: createdOn,
//       createdBy: this.allowanceForm.controls.createdBy.value ?? '',
//       updatedOn: updatedOn,
//       updatedBy: this.allowanceForm.controls.updatedOn.value ?? '',
//       deletedOn: deletedOn,
//       deletedBy: this.allowanceForm.controls.deletedOn.value ?? '',
//       remark: this.allowanceForm.controls.deletedBy.value ?? '',
//     };

//     if (this.allowanceID > 0) {
//       this.allowanceService.update(this.allowanceID, model).subscribe((res) => {
//         console.log(res);
//       });
//     } else {
//       this.allowanceService.create(model).subscribe((res) => {
//         console.log(res);
//       });
//     }

//   }
// }

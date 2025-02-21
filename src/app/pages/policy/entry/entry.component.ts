import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PolicyModel } from '../../../core/models/policy.model';
import { PolicyService } from '../../../core/services/policy.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-entry',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
})
export class EntryComponent implements OnInit {
  policyID: number = 0;
  model!: PolicyModel;

  constructor(
    private policyService: PolicyService,
    private route: ActivatedRoute
  ) {}

  private formBuilder = inject(FormBuilder);
  policyForm = this.formBuilder.group({
    id: [0],
    title: [''],
    description: [''],
    policyType: [0],
    companyId: [''],
    createdOn: [''],
    createdBy: [''],
    updatedOn: [''],
    updatedBy: [''],
    deletedOn: [''],
    deletedBy: [''],
    remark: [''],
  });

  ngOnInit(): void {
    this.policyID = parseInt(this.route.snapshot.paramMap.get('id') ?? '');
    console.log('Route Parameter:', this.policyID);

    if (this.policyID > 0) {
      this.policyService.getByID(this.policyID).subscribe((res) => {
        this.model = res.data as PolicyModel;
        console.log(this.model);

        this.policyForm.controls.id.setValue(this.model.id);
        this.policyForm.controls.id.disable();
        this.policyForm.controls.title.setValue(this.model.title);
        this.policyForm.controls.description.setValue(this.model.description);
        this.policyForm.controls.policyType.setValue(this.model.policyType);
        this.policyForm.controls.policyType.disable();
        this.policyForm.controls.companyId.setValue(this.model.companyId);
        this.policyForm.controls.createdOn.setValue(this.model.createdOn);
        this.policyForm.controls.createdBy.setValue(this.model.createdBy);
        this.policyForm.controls.updatedOn.setValue(this.model.updatedOn);
        this.policyForm.controls.updatedBy.setValue(this.model.updatedBy);
        this.policyForm.controls.deletedOn.setValue(this.model.deletedOn);
        this.policyForm.controls.deletedBy.setValue(this.model.deletedBy);
        this.policyForm.controls.remark.setValue(this.model.remark);
      });
    }
  }

  submit(): void {
    var model: PolicyModel = {
      id: this.policyForm.controls.id.value ?? 0,
      title: this.policyForm.controls.title.value ?? '',
      description: this.policyForm.controls.description.value ?? '',
      policyType: this.policyForm.controls.policyType.value ?? 0,
      companyId: this.policyForm.controls.companyId.value ?? '',
      createdOn: this.policyForm.controls.createdOn.value ?? '',
      createdBy: this.policyForm.controls.createdBy.value ?? '',
      updatedOn: this.policyForm.controls.updatedOn.value ?? '',
      updatedBy: this.policyForm.controls.updatedBy.value ?? '',
      deletedOn: this.policyForm.controls.deletedOn.value ?? '',
      deletedBy: this.policyForm.controls.deletedBy.value ?? '',
      remark: this.policyForm.controls.remark.value ?? '',
    };

    this.policyService.create(model).subscribe((res) => {
      console.log(res);
    });
  }
}

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
    policyType: [''],
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
      });
    }
  }

  submit(): void {
    var model: PolicyModel = {
      id: this.policyForm.controls.id.value ?? 0,
      title: this.policyForm.controls.title.value ?? '',
      description: this.policyForm.controls.description.value ?? '',
    };

    if (this.policyID > 0) {
      this.policyService.create(model).subscribe((res) => {
        console.log(res);
      });
    }
  }
}

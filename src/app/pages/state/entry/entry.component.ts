import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { StateService } from '../../../core/services/state.service';
import { StateModel } from '../../../core/models/state.model';
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
  stateID: number = 0;

  model!: StateModel;

  constructor(
    private stateService: StateService,
    private route: ActivatedRoute
  ) {}

  private formBuilder = inject(FormBuilder);
  statFrom = this.formBuilder.group({
    stateId: [0],
    stateName: [''],
    stateNameMm: [''],
  });

  ngOnInit(): void {
    this.stateID = parseInt(this.route.snapshot.paramMap.get('id') ?? '');
    console.log('Route Parameter:', this.stateID);

    if (this.stateID > 0) {
      this.stateService.getByID(this.stateID).subscribe((res) => {
        this.model = res.data as StateModel;
        console.log(this.model);

        this.statFrom.controls.stateId.setValue(this.model.stateId);

        this.statFrom.controls.stateId.disable();
        this.statFrom.controls.stateName.setValue(this.model.stateName);
        this.statFrom.controls.stateNameMm.setValue(this.model.stateNameMm);
      });
    }
  }

  submit(): void {
    var model: StateModel = {
      stateId: this.statFrom.controls.stateId.value ?? 0,
      stateName: this.statFrom.controls.stateName.value ?? '',
      stateNameMm: this.statFrom.controls.stateNameMm.value ?? '',
    };

    if (this.stateID > 0) {
      this.stateService.update(this.stateID, model).subscribe((res) => {
        console.log(res);
      });
    } else {
      this.stateService.create(model).subscribe((res) => {
        console.log(res);
      });
    }
  }
}

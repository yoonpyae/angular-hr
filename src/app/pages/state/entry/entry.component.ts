import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-entry',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
})
export class EntryComponent implements OnInit {
  constructor() {}

  private formBuilder = inject(FormBuilder);
  statFrom = this.formBuilder.group({
    stateId: [''],
    stateName: [''],
    stateNameMm: [''],
  });

  ngOnInit(): void {}
}

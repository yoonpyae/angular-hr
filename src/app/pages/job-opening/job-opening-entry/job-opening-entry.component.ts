import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

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
})
export class JobOpeningEntryComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}

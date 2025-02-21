import { Component, OnInit } from '@angular/core';
import { StateService } from '../../core/services/state.service';
import { RootModel } from '../../core/models/root.model';
import { StateModel } from '../../core/models/state.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-state',
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
  ],
  templateUrl: './state.component.html',
  styleUrl: './state.component.scss',
})
export class StateComponent implements OnInit {
  selectedState!: StateModel;
  states: StateModel[] = [];
  loading: boolean = true;

  activityValues: number[] = [0, 100];
  constructor(private stateService: StateService, private rout: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.stateService.get().subscribe((res) => {
      let result = res.data;
      this.states = result.states as StateModel[];
    });
  }

  update(state: StateModel): void {
    this.selectedState = state;
    this.rout.navigate(['/state/entry', this.selectedState.stateId]);
  }

  delete(state: StateModel): void {
    this.selectedState = state;
    if (this.selectedState !== null) {
      this.stateService.delete(this.selectedState.stateId).subscribe((res) => {
        this.loadData();
      });
    }
  }

  clear(table: Table) {
    table.clear();
  }
}

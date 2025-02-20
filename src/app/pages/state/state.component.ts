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

@Component({
  selector: 'app-state',
  imports: [
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
  states: StateModel[] = [];
  loading: boolean = true;

  activityValues: number[] = [0, 100];
  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.stateService.get().subscribe((res) => {
      let result = res.data;
      this.states = result.states as StateModel[];
    });
  }

  clear(table: Table) {
    table.clear();
  }
}

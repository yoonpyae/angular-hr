import { Component, OnInit } from '@angular/core';
import { StateService } from '../../core/services/state.service';
import { RootModel } from '../../core/models/root.model';
import { StateModel } from '../../core/models/state.model';
import { empty } from 'rxjs';

@Component({
  selector: 'app-state',
  imports: [],
  templateUrl: './state.component.html',
  styleUrl: './state.component.scss',
})
export class StateComponent implements OnInit {
  states: StateModel[] = [];

  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.stateService.get().subscribe((res) => {
      let result = res.data;
      this.states = result.states as StateModel[];
      console.log(result);
    });
  }
}

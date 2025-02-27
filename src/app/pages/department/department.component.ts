import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DepartmentModel } from '../../core/models/department.model';
import { DepartmentService } from '../../core/services/department.service';

@Component({
  selector: 'app-department',
  imports: [
    RouterModule,
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss',
  providers: [MessageService],
})
export class DepartmentComponent implements OnInit {
  selectedDepartment!: DepartmentModel;
  departments: DepartmentModel[] = [];
  loading: boolean = true;

  constructor(
    private messageService: MessageService,
    private rout: Router,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.loadData();
    console.log('Departments:', this.departments);
  }

  loadData() {
    this.departmentService.get().subscribe((res) => {
      this.departments = res.data as DepartmentModel[];
    });
  }
}

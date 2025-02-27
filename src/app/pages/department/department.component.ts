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

  update(department: DepartmentModel): void {
    this.selectedDepartment = department;
    this.rout.navigate(['/department/entry', this.selectedDepartment.deptId]);
  }

  delete(department: DepartmentModel): void {
    this.selectedDepartment = department;

    if (confirm('Are you sure you want to delete this record?')) {
      this.departmentService.delete(this.selectedDepartment.deptId).subscribe(
        (res) => {
          this.loadData();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Department ${department.deptName} deleted successfully`,
          });
          this.loadData();
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Failed to delete ${department.deptName}`,
          });
        }
      );
    }
  }

  getSeverity(status: boolean) {
    switch (status) {
      case true:
        return 'success';
      case false:
        return 'danger';
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootModel } from '../models/root.model';
import { enviornment } from '../../../environments/environment';
import { DepartmentModel } from '../models/department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private http: HttpClient) {}

  get(): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/Departments`;
    return this.http.get<RootModel>(url);
  }

  getByID(id: number): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/Departments/${id}`;
    return this.http.get<RootModel>(url);
  }

  getbyBranchIdbyCompanyId(
    branchId: number,
    companyId: string
  ): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/Departments/by?branchId=${branchId}&companyId=${companyId}`;
    return this.http.get<RootModel>(url);
  }

  create(model: DepartmentModel): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/Departments`;
    return this.http.post<RootModel>(url, JSON.stringify(model), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  update(id: number, model: DepartmentModel): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/Departments/${id}`;
    return this.http.put<RootModel>(url, JSON.stringify(model), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  delete(id: number): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/Departments/${id}`;
    return this.http.delete<RootModel>(url);
  }
}

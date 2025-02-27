import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootModel } from '../models/root.model';
import { enviornment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  constructor(private http: HttpClient) {}

  get(): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/Positions`;
    return this.http.get<RootModel>(url);
  }

  getByID(id: number): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/Positions/${id}`;
    return this.http.get<RootModel>(url);
  }

  getbyBranchIdbyCompanyIdbyDeptId(id: number): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/Positions/by`;
    return this.http.get<RootModel>(url);
  }
}

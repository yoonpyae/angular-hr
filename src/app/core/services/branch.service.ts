import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootModel } from '../models/root.model';
import { enviornment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  constructor(private http: HttpClient) {}

  get(): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/Branches`;
    return this.http.get<RootModel>(url);
  }

  getByID(id: number): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/Branches/${id}`;
    return this.http.get<RootModel>(url);
  }

  getByCompanyID(companyId: string): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/Branches/bycompanyId?companyId=${companyId}`;
    return this.http.get<RootModel>(url);
  }
}

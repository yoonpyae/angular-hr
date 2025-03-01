import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootModel } from '../models/root.model';
import { enviornment } from '../../../environments/environment';
import { AllowanceModel } from '../models/allowance.model';

@Injectable({
  providedIn: 'root',
})
export class AllowanceService {
  constructor(private http: HttpClient) {}

  get(): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/Allowance`;
    return this.http.get<RootModel>(url);
  }

  getByID(id: number): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/Allowance/${id}`;
    return this.http.get<RootModel>(url);
  }

  create(model: AllowanceModel): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/Allowance`;
    return this.http.post<RootModel>(url, JSON.stringify(model), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  update(id: number, model: AllowanceModel): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/Allowance/${id}`;
    return this.http.put<RootModel>(url, JSON.stringify(model), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  delete(id: number): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/Allowance/${id}`;
    return this.http.delete<RootModel>(url);
  }
}

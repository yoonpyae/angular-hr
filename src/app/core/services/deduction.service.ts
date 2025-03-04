import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootModel } from '../models/root.model';
import { enviornment } from '../../../environments/environment';
import { DeductionModel } from '../models/deduction.model';

@Injectable({
  providedIn: 'root',
})
export class DeductionService {
  constructor(private http: HttpClient) {}

  get(): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/Deductions`;
    return this.http.get<RootModel>(url);
  }

  getByID(id: number): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/Deductions/${id}`;
    return this.http.get<RootModel>(url);
  }

  create(model: DeductionModel): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/Deductions`;
    return this.http.post<RootModel>(url, JSON.stringify(model), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  update(id: number, model: DeductionModel): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/Deductions/${id}`;
    return this.http.put<RootModel>(url, JSON.stringify(model), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  delete(id: number): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/Deductions/${id}`;
    return this.http.delete<RootModel>(url);
  }
}

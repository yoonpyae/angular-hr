import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootModel } from '../models/root.model';
import { enviornment } from '../../../environments/environment';
import { JobOpeningModel } from '../models/job-opening.model';
import { Header } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class JobOpeningService {
  constructor(private http: HttpClient) {}

  get(): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/JobOpening`;
    return this.http.get<RootModel>(url);
  }

  getbyid(id: number): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/JobOpening/${id}`;
    return this.http.get<RootModel>(url);
  }

  create(model: JobOpeningModel): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/JobOpening`;
    return this.http.post<RootModel>(url, JSON.stringify(model), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  update(id: number, model: JobOpeningModel): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/JobOpening/${id}`;
    return this.http.put<RootModel>(url, JSON.stringify(model), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  delete(id: number): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/JobOpening/${id}`;
    return this.http.delete<RootModel>(url);
  }
}

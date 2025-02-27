import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootModel } from '../models/root.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  get(): Observable<RootModel> {
    let url: string = `https://localhost:44337/api/Companies`;
    return this.http.get<RootModel>(url);
  }

  getByID(id: number): Observable<RootModel> {
    let url: string = `https://localhost:44337/api/Companies/${id}`;
    return this.http.get<RootModel>(url);
  }
}

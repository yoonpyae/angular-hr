import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootModel } from '../models/root.model';
import { enviornment } from '../../../environments/environment';
import { StateModel } from '../models/state.model';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  constructor(private http: HttpClient) {}

  get(): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/States`;
    return this.http.get<RootModel>(url);
  }

  create(model: StateModel): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/States`;
    return this.http.post<RootModel>(url, JSON.stringify(model));
  }

  update(id: number, model: StateModel): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/States/${id}`;
    return this.http.put<RootModel>(url, JSON.stringify(model));
  }

  delete(id: number): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/States/${id}`;
    return this.http.delete<RootModel>(url);
  }
}

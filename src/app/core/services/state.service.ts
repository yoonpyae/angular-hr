import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootModel } from '../models/root.model';
import { enviornment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  constructor(private http: HttpClient) {}

  get(): Observable<RootModel> {
    let url: string = `${enviornment.apiUrl}/api/States`;
    return this.http.get<RootModel>(url);
  }
}

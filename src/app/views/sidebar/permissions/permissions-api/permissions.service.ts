import { URL_SERVICIOS } from './../../../../config/config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PermissionsResponse } from '../../../../models/permissions';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  private apiUrl = `${URL_SERVICIOS}/permissions`;
  constructor(private http: HttpClient) { }

  list(): Observable<PermissionsResponse> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}`;
    return this.http.get<PermissionsResponse>(url, { headers });
  }

  private getHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
  }
}

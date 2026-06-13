import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVICIOS } from './../../../../config/config';
import { RoleCreateUpdate, RoleCreateUpdateResponse, RoleResponse, RolesAllResponse, RolesResponse } from './../../../../models/roles';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private apiUrl = `${URL_SERVICIOS}/roles`;
  constructor(private http: HttpClient) { }

  list(page: number = 1): Observable<RolesResponse> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get<RolesResponse>(url, { headers });
  }

  // listAll(): Observable<RolesAllResponse> {
  //   const headers = this.getHeaders();
  //   const url = `${this.apiUrl}All`;
  //   return this.http.get<RolesAllResponse>(url, { headers });
  // }

  // create(product: Partial<RoleCreateUpdate>): Observable<RoleCreateUpdateResponse> {
  //   const headers = this.getHeaders();
  //   return this.http.post<RoleCreateUpdateResponse>(this.apiUrl, product, { headers });
  // }

  read(id: string): Observable<RoleResponse> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<RoleResponse>(url, { headers });
  }

  update(id: number | string, role: Partial<RoleCreateUpdate>): Observable<RoleCreateUpdateResponse> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<RoleCreateUpdateResponse>(url, role, { headers });
  }

  delete(id: string): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, { headers });
  }

  private getHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
  }
}

import { URL_SERVICIOS } from './../../../../config/config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DriverCreateRequest, DriverCreateResponse, DriverDeleteResponse, DriverResponse, DriversAllResponse, DriversResponse, DriverUpdateRequest, DriverUpdateResponse } from '../../../../models/drivers';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  private apiUrl = `${URL_SERVICIOS}/drivers`;
  constructor(private http: HttpClient) { }

  list(page: number = 1): Observable<DriversResponse> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get<DriversResponse>(url, { headers });
  }

  /* Servicio para listar todos los conductores */
  list_all(): Observable<DriversAllResponse> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/all`;
    return this.http.get<DriversAllResponse>(url, { headers });
  }

  read(id: string): Observable<DriverResponse> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<DriverResponse>(url, { headers });
  }

  update(id: string, data: DriverUpdateRequest): Observable<DriverUpdateResponse> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<DriverUpdateResponse>(url, data, { headers });
  }

  create(data: DriverCreateRequest): Observable<DriverCreateResponse> {
    const headers = this.getHeaders();
    return this.http.post<DriverCreateResponse>(this.apiUrl, data, { headers });
  }

  delete(id: string): Observable<DriverDeleteResponse> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<DriverDeleteResponse>(url, { headers });
  }

  private getHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
  }

}

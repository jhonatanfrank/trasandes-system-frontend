import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TripCreateRequest, TripCreateResponse, TripDeleteResponse, TripReadResponse, TripsListResponse, TripUpdateRequest, TripUpdateResponse } from '../../../../models/trips';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  private apiUrl = `${URL_SERVICIOS}/trips`;
  constructor(private http: HttpClient) { }

  list_pagination(page: number = 1): Observable<TripsListResponse> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get<TripsListResponse>(url, { headers });
  }

  read(id: string): Observable<TripReadResponse> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<TripReadResponse>(url, { headers });
  }

  create(data: TripCreateRequest): Observable<TripCreateResponse> {
    const headers = this.getHeaders();
    return this.http.post<TripCreateResponse>(this.apiUrl, data, { headers });
  }

  /* Servicio para actualizar un viaje */
  update(id: string, data: TripUpdateRequest): Observable<TripUpdateResponse> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<TripUpdateResponse>(url, data, { headers });
  }

  delete(id: string): Observable<TripDeleteResponse> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<TripDeleteResponse>(url, { headers });
  }

  private getHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
  }
}

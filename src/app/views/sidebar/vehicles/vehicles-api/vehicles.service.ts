import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from './../../../../config/config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleCreateRequest, VehicleCreateResponse, VehicleDeleteResponse, VehicleExistsResponse, VehicleReadResponse, VehiclesAllResponse, VehiclesListResponse, VehicleUpdateRequest, VehicleUpdateResponse } from '../../../../models/vehicles';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  private apiUrl = `${URL_SERVICIOS}/vehicles`;
  constructor(private http: HttpClient) { }

  /* Servicio para listar todos los vehículos con paginación */
  list_pagination(page: number = 1): Observable<VehiclesListResponse> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get<VehiclesListResponse>(url, { headers });
  }

  /* Servicio para listar todos los vehículos */
  list_all(): Observable<VehiclesAllResponse> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/all`;
    return this.http.get<VehiclesAllResponse>(url, { headers });
  }

  /* Servicio para verificar si una placa ya existe */
  checkPlacaExists(placa: string, id?: number): Observable<VehicleExistsResponse> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/existe-placa`;
    const params: any = { placa };
    if (id) {
      params.id = id;
    }
    return this.http.get<VehicleExistsResponse>(url, { headers, params });
  }

  /* Servicio para leer un vehículo */
  read(id: string): Observable<VehicleReadResponse> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<VehicleReadResponse>(url, { headers });
  }

  /* Servicio para crear un vehículo */
  create(data: VehicleCreateRequest): Observable<VehicleCreateResponse> {
    const headers = this.getHeaders();
    return this.http.post<VehicleCreateResponse>(this.apiUrl, data, { headers });
  }

  /* Servicio para actualizar un vehículo */
  update(id: string, data: VehicleUpdateRequest): Observable<VehicleUpdateResponse> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<VehicleUpdateResponse>(url, data, { headers });
  }

  /* Servicio para eliminar un vehículo */
  delete(id: string): Observable<VehicleDeleteResponse> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<VehicleDeleteResponse>(url, { headers });
  }

  private getHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
  }

}

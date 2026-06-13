import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsersAllResponse } from 'src/app/models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${URL_SERVICIOS}/users`;
  constructor(private http: HttpClient) { }

  // /* Servicio para listar todos las carrocerias con paginación */
  // list_pagination(page: number = 1): Observable<CarBodiesPaginationResponse> {
  //   const headers = this.getHeaders();
  //   const url = `${this.apiUrl}?page=${page}`;
  //   return this.http.get<CarBodiesPaginationResponse>(url, { headers });
  // }

  /* Servicio para listar todas las carrocerias */
  list_all(): Observable<UsersAllResponse> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/all`;
    return this.http.get<UsersAllResponse>(url, { headers });
  }

  // /* Servicio para verificar si una placa ya existe */
  // checkPlacaExists(placa: string, id?: number): Observable<CarBodyExistsResponse> {
  //   const headers = this.getHeaders();
  //   const url = `${this.apiUrl}/existe-placa`;
  //   const params: any = { placa };
  //   if (id) {
  //     params.id = id;
  //   }
  //   return this.http.get<CarBodyExistsResponse>(url, { headers, params });
  // }

  // /* Servicio para leer una carroceria específica */
  // read(id: string): Observable<CarBodyReadResponse> {
  //   const headers = this.getHeaders();
  //   const url = `${this.apiUrl}/${id}`;
  //   return this.http.get<CarBodyReadResponse>(url, { headers });
  // }

  // /* Servicio para actualizar una carroceria */
  // update(id: string, data: CarBodyUpdateRequest): Observable<CarBodyUpdateResponse> {
  //   const headers = this.getHeaders();
  //   const url = `${this.apiUrl}/${id}`;
  //   return this.http.put<CarBodyUpdateResponse>(url, data, { headers });
  // }

  // /* Servicio para crear una nueva carroceria */
  // create(data: CarBodyCreateRequest): Observable<CarBodyCreateResponse> {
  //   const headers = this.getHeaders();
  //   return this.http.post<CarBodyCreateResponse>(this.apiUrl, data, { headers });
  // }

  // /* Servicio para eliminar una carroceria */
  // delete(id: string): Observable<CarBodyDeleteResponse> {
  //   const headers = this.getHeaders();
  //   const url = `${this.apiUrl}/${id}`;
  //   return this.http.delete<CarBodyDeleteResponse>(url, { headers });
  // }

  private getHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
  }
}

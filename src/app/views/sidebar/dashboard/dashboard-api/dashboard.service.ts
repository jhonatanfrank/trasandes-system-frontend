import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { EstadoViajesResponse, EstadoViajesResumenResponse, InfoCardsResponse, LicenciasVencerseResponse } from '../../../../models/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = `${URL_SERVICIOS}/dashboard`;
  constructor(private http: HttpClient) { }

  licencias_vencer(): Observable<LicenciasVencerseResponse> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/licencias-vencer`;
    return this.http.get<LicenciasVencerseResponse>(url, { headers });
  }

  info_cards(): Observable<InfoCardsResponse> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/info-cards`;
    return this.http.get<InfoCardsResponse>(url, { headers });
  }

  estado_viajes(): Observable<EstadoViajesResponse> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/estado-viajes`;
    return this.http.get<EstadoViajesResponse>(url, { headers });
  }

  estado_viajes_resumen(): Observable<EstadoViajesResumenResponse> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/estado-viajes-resumen`;
    return this.http.get<EstadoViajesResumenResponse>(url, { headers });
  }

  private getHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
  }

}

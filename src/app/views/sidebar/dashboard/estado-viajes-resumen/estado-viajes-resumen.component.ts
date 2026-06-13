import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard-api/dashboard.service';
import { EstadoViajesResumen } from 'src/app/models/dashboard';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estado-viajes-resumen',
  imports: [CommonModule],
  templateUrl: './estado-viajes-resumen.component.html',
  styleUrl: './estado-viajes-resumen.component.scss'
})
export class EstadoViajesResumenComponent implements OnInit {

  loading = false;
  data: EstadoViajesResumen[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading = true;

    this.dashboardService.estado_viajes_resumen()
      .subscribe({
        next: (resp) => {
          this.data = resp.data;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
  }

  getColor(estado: string): string {
    switch (estado) {
      case 'EnRuta':
        return 'primary';
      case 'Finalizado':
        return 'success';
      case 'Retrasado':
        return 'danger';
      default:
        return 'secondary';
    }
  }

  formatEstado(estado: string): string {
    return estado
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .toUpperCase();
  }
}

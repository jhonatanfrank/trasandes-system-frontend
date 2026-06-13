import { Component, OnInit } from '@angular/core';
import { EstadoViajes } from 'src/app/models/dashboard';
import { DashboardService } from '../dashboard-api/dashboard.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-estado-viajes',
  imports: [CommonModule],
  templateUrl: './estado-viajes.component.html',
  styleUrl: './estado-viajes.component.scss'
})
export class EstadoViajesComponent implements OnInit {

  viajes: EstadoViajes[] = [];
  loading = false;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.cargarViajes();
  }

  cargarViajes(): void {
    this.loading = true;

    this.dashboardService.estado_viajes()
      .subscribe({
        next: (resp) => {
          this.viajes = resp.data;
          this.loading = false;
          console.log(this.viajes);
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'EnRuta':
        return 'bg-primary';

      case 'Finalizado':
        return 'bg-success';

      case 'Retrasado':
        return 'bg-danger';

      default:
        return 'bg-secondary';
    }
  }

  formatEstado(estado: string): string {
    if (!estado) return '';

    return estado
      .replace(/([a-z])([A-Z])/g, '$1 $2') // separa camelCase
      .toUpperCase(); // mayúsculas
  }
}

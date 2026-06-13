import { Component, OnInit } from '@angular/core';
import { LicenciaVencerse } from 'src/app/models/dashboard';
import { DashboardService } from '../dashboard-api/dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-licencias-vencer',
  imports: [CommonModule],
  templateUrl: './licencias-vencer.component.html',
  styleUrl: './licencias-vencer.component.scss'
})
export class LicenciasVencerComponent implements OnInit {

  licencias: LicenciaVencerse[] = [];
  loading = false;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.cargarLicencias();
  }

  cargarLicencias(): void {
    this.loading = true;

    this.dashboardService.licencias_vencer()
      .subscribe({
        next: (resp) => {
          this.licencias = resp.data;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
  }

  calcularDias(fecha: string): string {
    const hoy = new Date();
    const vencimiento = new Date(fecha);

    const diff = Math.ceil(
      (vencimiento.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diff < 0) return 'Vencida';
    return `${diff} días`;
  }

  getEstadoTexto(fecha: string): string {
    const diff = this.getDiff(fecha);

    if (diff < 0) return 'VENCIDA';
    if (diff <= 7) return 'URGENTE';
    return 'ALERTA';
  }

  getBadgeClass(fecha: string): string {
    const diff = this.getDiff(fecha);

    if (diff < 0) return 'bg-danger';
    if (diff <= 7) return 'bg-warning';
    return 'bg-success';
  }

  private getDiff(fecha: string): number {
    const hoy = new Date();
    const vencimiento = new Date(fecha);

    return Math.ceil(
      (vencimiento.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)
    );
  }
}

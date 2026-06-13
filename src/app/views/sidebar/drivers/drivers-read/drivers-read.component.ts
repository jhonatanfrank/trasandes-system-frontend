import { Driver } from './../../../../models/drivers';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SpinnerComponent } from '@coreui/angular';
import { DriversService } from '../drivers-api/drivers.service';

@Component({
  selector: 'app-drivers-read',
  imports: [FormsModule, CommonModule, SpinnerComponent, RouterLink],
  templateUrl: './drivers-read.component.html',
  styleUrl: './drivers-read.component.scss'
})
export class DriversReadComponent implements OnInit {

  toasts: { message: string; type: 'success' | 'error'; visible: boolean }[] = [];

  driver_id: string | null = null;
  driver_data: Driver | null = null;
  loading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private driverService: DriversService) { }

  ngOnInit(): void {
    this.driver_id = this.route.snapshot.paramMap.get('id');
    this.loadDriver();
  }

  private loadDriver(): void {
    if (!this.driver_id) {
      this.error = 'No se especificó el ID del conductor';
      this.loading = false;
      return;
    }
    this.loading = true;
    this.driverService.read(this.driver_id).subscribe({
      next: ({ success, message, data }) => {
        this.driver_data = success ? data : null;
        this.error = success ? null : (message || 'Error desconocido');
        this.loading = false;
        console.log(this.driver_data)
      },
      error: (err) => {
        this.error = 'Error al obtener el conductor';
        this.showToast(err.error?.message || 'Error de red o servidor', 'error');
        this.driver_data = null;
        this.loading = false;
      }
    });
  }

  getDiasVencidos(fecha: string | null): number {
    if (!fecha) return 0;

    const hoy = new Date();
    const vencimiento = new Date(fecha);

    return Math.ceil((vencimiento.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
  }

  getDiasVencidosAbs(fecha: string | null): number {
    return Math.abs(this.getDiasVencidos(fecha));
  }

  showToast(message: string, type: 'success' | 'error' = 'success') {
    const toast = { message, type, visible: true };
    this.toasts.push(toast);

    setTimeout(() => {
      toast.visible = false;
      setTimeout(() => {
        this.toasts = this.toasts.filter(t => t !== toast);
      }, 300);
    }, 3000);
  }


}

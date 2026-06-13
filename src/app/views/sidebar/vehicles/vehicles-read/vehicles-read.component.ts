import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../../../models/vehicles';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { VehiclesService } from '../vehicles-api/vehicles.service';
import { SpinnerComponent } from '@coreui/angular';

@Component({
  selector: 'app-vehicles-read',
  imports: [CommonModule, SpinnerComponent, RouterLink],
  templateUrl: './vehicles-read.component.html',
  styleUrl: './vehicles-read.component.scss'
})
export class VehiclesReadComponent implements OnInit {
  toasts: { message: string; type: 'success' | 'error'; visible: boolean }[] = [];

  vehicle_id: string | null = null;
  vehicle_data: Vehicle | null = null;
  loading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private vehicleService: VehiclesService) { }

  ngOnInit(): void {
    this.vehicle_id = this.route.snapshot.paramMap.get('id');
    this.loadVehicle();
  }

  private loadVehicle(): void {
    if (!this.vehicle_id) {
      this.showToast('No se especificó el ID del vehículo', 'error');
      this.loading = false;
      return;
    }
    this.loading = true;
    this.vehicleService.read(this.vehicle_id).subscribe({
      next: ({ success, message, data }) => {
        this.vehicle_data = success ? data : null;
        this.error = success ? null : (message || 'Error desconocido');
        this.loading = false;
        console.log(this.vehicle_data)
      },
      error: (err) => {
        this.showToast('Error al cargar el vehículo: ' + (err.message || 'Error desconocido'), 'error');
        this.vehicle_data = null;
        this.loading = false;
      }
    });
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

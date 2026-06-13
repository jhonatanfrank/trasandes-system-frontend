import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SpinnerComponent, TableDirective } from '@coreui/angular';
import { VehiclesService } from '../vehicles-api/vehicles.service';
import { AuthService } from '../../../../auth/service/auth.service';
import { Vehicle, VehiclesData } from '../../../../models/vehicles';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicles-list',
  imports: [RouterLink, SpinnerComponent, CommonModule],
  templateUrl: './vehicles-list.component.html',
  styleUrl: './vehicles-list.component.scss'
})
export class VehiclesListComponent implements OnInit {
  constructor(private vehicleService: VehiclesService, private authService: AuthService) { }

  /* Toast */
  toasts: { message: string; type: 'success' | 'error'; visible: boolean }[] = [];

  vehicles: Vehicle[] = [];
  vehiclesData: VehiclesData | null = null;
  loading: boolean = true;
  currentPage: number = 1;

  ngOnInit(): void {
    this.load_vehicles_pagination(1);
  }

  load_vehicles_pagination(page: number): void {
    this.loading = true;
    this.vehicleService.list_pagination(page).subscribe({
      next: (response) => {
        this.vehiclesData = response.data;
        this.vehicles = this.vehiclesData.data;
        this.currentPage = this.vehiclesData.current_page;
        this.loading = false;
        console.log('Vehicles cargados:', this.vehicles);
      },
      error: (err) => {
        console.error('Error al cargar los vehicles:', err);
        this.showToast('Error al cargar los vehicles: ' + (err.error?.message || err.message || ''), 'error');
        this.loading = false;
      }
    })
  }

  goToPage(page: number | null): void {
    if (page && page !== this.currentPage) {
      this.load_vehicles_pagination(page);
    }
  }

  deleteVehicle(id: string): void {
    if (confirm('¿Estás seguro que deseas eliminar este vehículo?')) {
      this.vehicleService.delete(id).subscribe({
        next: (res) => {
          alert('Vehículo eliminado correctamente.');
          this.showToast(res.message, 'success');
          this.load_vehicles_pagination(this.currentPage);
        },
        error: (err) => {
          console.error('Error al eliminar el vehículo:', err);
          alert('No se pudo eliminar el vehículo.');
          this.showToast('Error al eliminar el vehículo: ' + (err.error?.message || err.message || ''), 'error');
        }
      });
    }
  }
  /* Toast */
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

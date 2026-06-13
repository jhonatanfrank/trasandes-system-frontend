import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SpinnerComponent, TableDirective } from '@coreui/angular';
import { AuthService } from '../../../../auth/service/auth.service';
import { DriversService } from '../drivers-api/drivers.service';
import { Driver, DriversData } from '../../../../models/drivers';

@Component({
  selector: 'app-drivers-list',
  imports: [RouterLink, SpinnerComponent, CommonModule],
  templateUrl: './drivers-list.component.html',
  styleUrl: './drivers-list.component.scss'
})
export class DriversListComponent implements OnInit {
  constructor(private driversService: DriversService, private authService: AuthService) { }

  toasts: { message: string; type: 'success' | 'error'; visible: boolean }[] = [];


  driver: Driver[] = [];
  driversData!: DriversData;
  loading: boolean = true;
  currentPage: number = 1;

  ngOnInit(): void {
    this.load_drivers_pagination(1);
  }

  load_drivers_pagination(page: number): void {
    this.loading = true;
    this.driversService.list(page).subscribe({
      next: (response) => {
        this.driversData = response.data;
        this.driver = this.driversData.data;
        this.currentPage = this.driversData.current_page;
        this.loading = false;
        console.log('Drivers cargados:', this.driver);
      },
      error: (err) => {
        console.error('Error al cargar los drivers:', err);
        this.loading = false;
      }
    })
  }

  goToPage(page: number | null): void {
    if (page && page !== this.currentPage) {
      this.load_drivers_pagination(page);
    }
  }

  deleteDriver(id: string): void {
    if (confirm('¿Estás seguro que deseas eliminar este conductor?')) {
      this.driversService.delete(id).subscribe({
        next: (res) => {
          alert('Conductor eliminado correctamente.');
          this.showToast(res.message, 'success');
          this.load_drivers_pagination(this.currentPage); // recarga la página actual
        },
        error: (err) => {
          console.error('Error al eliminar el conductor:', err);
          this.showToast(err.error?.message || 'No se pudo eliminar el conductor.', 'error');
          alert('No se pudo eliminar el conductor.');
        }
      });
    }
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

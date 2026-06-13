import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SpinnerComponent, TableDirective } from '@coreui/angular';
import { AuthService } from '../../../../auth/service/auth.service';
import { TripsService } from '../trips-api/trips.service';
import { TripPagination, TripsData } from '../../../../models/trips';

@Component({
  selector: 'app-trips-list',
  imports: [RouterLink, SpinnerComponent, CommonModule],
  templateUrl: './trips-list.component.html',
  styleUrl: './trips-list.component.scss'
})
export class TripsListComponent {
  constructor(private tripsService: TripsService, private authService: AuthService) { }

  /* Toast */
  toasts: { message: string; type: 'success' | 'error'; visible: boolean }[] = [];


  trips: TripPagination[] = [];
  tripsData?: TripsData;
  loading: boolean = true;
  currentPage: number = 1;

  ngOnInit(): void {
    this.load_trips_pagination(1);
  }

  load_trips_pagination(page: number): void {
    this.loading = true;
    this.tripsService.list_pagination(page).subscribe({
      next: (response) => {
        this.tripsData = response.data;
        this.trips = this.tripsData.data;
        this.currentPage = this.tripsData.current_page;
        this.loading = false;
        console.log('Trips cargados:', this.trips);
      },
      error: (err) => {
        console.error('Error al cargar los trips:', err);
        this.showToast('Error al cargar los viajes: ' + (err.error?.message || err.message || ''), 'error');
        this.loading = false;
      }
    })
  }

  goToPage(page: number | null): void {
    if (page && page !== this.currentPage) {
      this.load_trips_pagination(page);
    }
  }

  deleteTrip(id: string): void {
    if (confirm('¿Estás seguro que deseas eliminar este viaje?')) {
      this.tripsService.delete(id).subscribe({
        next: (res) => {
          alert('Viaje eliminado correctamente.');
          this.showToast(res.message, 'success');
          this.load_trips_pagination(this.currentPage); // recarga la página actual
        },
        error: (err) => {
          console.error('Error al eliminar el viaje:', err);
          alert('No se pudo eliminar el viaje.');
          this.showToast('Error al eliminar el viaje: ' + (err.error?.message || err.message || ''), 'error');
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

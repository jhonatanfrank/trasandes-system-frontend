import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SpinnerComponent } from '@coreui/angular';
import { TripsService } from '../trips-api/trips.service';
import { TripRead } from '../../../../models/trips';

@Component({
  selector: 'app-trips-read',
  imports: [CommonModule, SpinnerComponent, RouterLink],
  templateUrl: './trips-read.component.html',
  styleUrl: './trips-read.component.scss'
})
export class TripsReadComponent implements OnInit {
  /* Toast */
  toasts: { message: string; type: 'success' | 'error'; visible: boolean }[] = [];


  trip_id: string | null = null;
  trip_data: TripRead | null = null;
  loading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private tripService: TripsService) { }

  ngOnInit(): void {
    this.trip_id = this.route.snapshot.paramMap.get('id');
    this.loadTrip();
  }

  private loadTrip(): void {
    if (!this.trip_id) {
      this.showToast('No se especificó el ID de la excursión', 'error');
      this.loading = false;
      return;
    }
    this.loading = true;

    this.tripService.read(this.trip_id).subscribe({
      next: ({ success, message, data }) => {
        if (success) {
          this.trip_data = data;
        } else {
          this.trip_data = null;
          this.showToast(message || 'Error desconocido', 'error');
        }
        this.loading = false;
        console.log(this.trip_data);
      },
      error: (err) => {
        this.trip_data = null;
        this.loading = false;
        this.showToast(err.error?.message || err.message || 'Error al cargar la excursión', 'error');
      }
    });
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

  get totalPrecio(): number {
    return (this.trip_data?.expenses || [])
      .reduce((sum, exp) => sum + Number(exp.precio || 0), 0);
  }

}

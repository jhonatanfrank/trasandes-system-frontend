import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SpinnerComponent, TableDirective } from '@coreui/angular';
import { CarbodiesService } from '../carbodies-api/carbodies.service';
import { AuthService } from '../../../../auth/service/auth.service';
import { CarBodiesData, CarBody } from '../../../../models/carbodies';

@Component({
  selector: 'app-carbodies-list',
  imports: [RouterLink, SpinnerComponent, CommonModule],
  templateUrl: './carbodies-list.component.html',
  styleUrl: './carbodies-list.component.scss'
})
export class CarbodiesListComponent implements OnInit {
  constructor(private carbodyService: CarbodiesService, private authService: AuthService) { }

  /* Toast */
  toasts: { message: string; type: 'success' | 'error'; visible: boolean }[] = [];

  carbodies: CarBody[] = [];
  carBodiesData?: CarBodiesData;
  loading: boolean = true;
  currentPage: number = 1;

  ngOnInit(): void {
    this.load_carbody_pagination(1);
  }

  load_carbody_pagination(page: number): void {
    this.loading = true;
    this.carbodyService.list_pagination(page).subscribe({
      next: (response) => {
        this.carBodiesData = response.data;
        this.carbodies = this.carBodiesData.data;
        this.currentPage = this.carBodiesData.current_page;
        this.loading = false;
      },
      error: (err) => {
        this.showToast('Error al cargar la lista de carrocerías: ' + (err.error?.message || err.message || ''), 'error');
        this.loading = false;
      }
    })
  }

  goToPage(page: number | null): void {
    if (page && page !== this.currentPage) {
      this.load_carbody_pagination(page);
    }
  }

  deleteCarbody(id: string): void {
    if (confirm('¿Estás seguro que deseas eliminar este vehículo?')) {
      this.carbodyService.delete(id).subscribe({
        next: (res) => {
          this.showToast(res.message, 'success');
          this.load_carbody_pagination(this.currentPage);
        },
        error: (err) => {
          this.showToast('Error al eliminar la carrocería: ' + (err.error?.message || err.message || ''), 'error');
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

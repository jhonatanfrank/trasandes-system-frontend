import { Component, OnInit } from '@angular/core';
import { CarBody } from '../../../../models/carbodies';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarbodiesService } from '../carbodies-api/carbodies.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '@coreui/angular';

@Component({
  selector: 'app-carbodies-read',
  imports: [FormsModule, CommonModule, SpinnerComponent, RouterLink],
  templateUrl: './carbodies-read.component.html',
  styleUrl: './carbodies-read.component.scss'
})
export class CarbodiesReadComponent {

  /* Toast */
  toasts: { message: string; type: 'success' | 'error'; visible: boolean }[] = [];


  carbody_id: string | null = null;
  carbody_data: CarBody | null = null;
  loading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private carbodyService: CarbodiesService) { }

  ngOnInit(): void {
    this.carbody_id = this.route.snapshot.paramMap.get('id');
    this.load_carbody();
  }

  private load_carbody(): void {
    if (!this.carbody_id) {
      this.showToast('No se especificó el ID de la carrocería', 'error');
      return;
    }
    this.loading = true;
    this.carbodyService.read(this.carbody_id).subscribe({
      next: ({ success, message, data }) => {
        if (success) {
          this.carbody_data = data;
        } else {
          this.carbody_data = null;
          this.showToast(message || 'Error desconocido', 'error');
        }
        this.loading = false;
      },
      error: (err) => {
        this.carbody_data = null;
        this.loading = false;
        this.showToast(
          'Error al obtener la carrocería: ' +
          (err.error?.message || err.message || ''),
          'error'
        );
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

}

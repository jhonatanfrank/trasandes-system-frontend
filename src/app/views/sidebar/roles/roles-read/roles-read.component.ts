import { Component, OnInit } from '@angular/core';
import { Role } from '../../../../models/roles';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RolesService } from '../roles-api/roles.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles-read',
  imports: [CommonModule, RouterLink],
  templateUrl: './roles-read.component.html',
  styleUrl: './roles-read.component.scss'
})
export class RolesReadComponent implements OnInit {
  toasts: { message: string; type: 'success' | 'error'; visible: boolean }[] = [];

  roles_id: string | null = null;
  role_data: Role | null = null;
  loading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private rolesService: RolesService) { }

  ngOnInit(): void {
    this.roles_id = this.route.snapshot.paramMap.get('id');
    this.loadRole();
  }

  private loadRole(): void {
    if (!this.roles_id) {
      this.error = 'No se especificó el ID del rol';
      this.loading = false;
      return;
    }
    this.loading = true;
    this.rolesService.read(this.roles_id).subscribe({
      next: ({ success, message, data }) => {
        this.role_data = success ? data : null;
        this.error = success ? null : (message || 'Error desconocido');
        this.loading = false;
        console.log(this.role_data)
      },
      error: (err) => {
        this.error = 'Error al obtener el rol';
        this.role_data = null;
        this.loading = false;
        this.showToast(this.error, 'error');
      }
    });
  }

  hasPermissions(): boolean {
    return !!(this.role_data && this.role_data.permissions && this.role_data.permissions.length > 0);
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


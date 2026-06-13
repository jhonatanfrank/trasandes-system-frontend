import { Component, OnInit } from '@angular/core';
import { RolesService } from '../roles-api/roles.service';
import { Role } from '../../../../models/roles';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-roles-update',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './roles-update.component.html',
  styleUrl: './roles-update.component.scss'
})
export class RolesUpdateComponent implements OnInit {
  toasts: { message: string; type: 'success' | 'error'; visible: boolean; }[] = [];

  roles_id: string | null = null;
  role_data: Role | null = null;

  loading = true;
  saving = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private rolesService: RolesService
  ) { }

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
      },
      error: (err) => {
        this.showToast(err.message || 'Error al cargar el rol', 'error');
        this.error = 'Error al obtener el rol';
        this.role_data = null;
        this.loading = false;
      }
    });
  }

  hasPermissions(): boolean {
    return !!(
      this.role_data &&
      this.role_data.permissions &&
      this.role_data.permissions.length > 0
    );
  }

  updateRole(): void {
    if (!this.roles_id || !this.role_data) return;

    this.saving = true;

    // 🔥 Convertir PermissionGroup[] → string[]
    const payload = {
      name: this.role_data.name,
      permissions: this.role_data.permissions
        ?.flatMap(group => group.permissions)
        .filter(p => p.assigned)
        .map(p => p.name)
    };

    this.rolesService.update(this.roles_id, payload).subscribe({
      next: () => {
        this.saving = false;
        this.showToast('Rol actualizado correctamente', 'success');
      },
      error: (err) => {
        this.saving = false;
        this.showToast(err.message || 'Error al actualizar el rol', 'error');
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
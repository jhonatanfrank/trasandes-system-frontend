import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonDirective, ButtonGroupComponent, SpinnerComponent, TableDirective } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { RouterLink } from '@angular/router';
import { Role, RolesData } from '../../../../models/roles';
import { RolesService } from '../roles-api/roles.service';
import { AuthService } from '../../../../../app/auth/service/auth.service';

@Component({
  selector: 'app-roles-list',
  imports: [
    CommonModule,
    FormsModule,
    TableDirective,
    ButtonGroupComponent,
    ButtonDirective,
    IconModule,
    SpinnerComponent,
    RouterLink],
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.scss'
})
export class RolesListComponent implements OnInit {

  /* Toast */
  toasts: { message: string; type: 'success' | 'error'; visible: boolean }[] = [];

  constructor(private roleService: RolesService, private authService: AuthService) { }

  roles: Role[] = [];
  loading: boolean = true;
  rolesData!: RolesData;
  currentPage: number = 1;

  canCreateRole = false;
  canReadRole = false;
  canUpdateRole = false;
  canDeleteRole = false;
  
  ngOnInit(): void {
    this.authService.permissions$.subscribe(perms => {
      console.log('Permisos:', perms);

      this.canCreateRole = perms.includes('create_role');
      this.canReadRole = perms.includes('read_role');
      this.canUpdateRole = perms.includes('update_role');
      this.canDeleteRole = perms.includes('delete_role');
    });

    this.loadRoles(this.currentPage);
  }


  loadRoles(page: number): void {
    this.loading = true;
    this.roleService.list(page).subscribe({
      next: (response) => {
        this.rolesData = response.data;
        this.roles = this.rolesData.data;
        this.currentPage = this.rolesData.current_page;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar los products:', err);
        this.loading = false;
      }
    })
  }

  goToPage(page: number | null): void {
    if (page && page !== this.currentPage) {
      this.loadRoles(page);
    }
  }

  getAssignedPermissions(role: Role): string {
    if (!role || !role.permissions) return 'Sin permisos';
    const assignedPermissions: string[] = [];
    // Recorrer cada módulo
    for (const group of role.permissions) {
      // Filtrar los permisos asignados dentro de ese módulo
      const assignedInGroup = group.permissions
        .filter(p => p.assigned)
        .map(p => p.name);
      assignedPermissions.push(...assignedInGroup);
    }
    return assignedPermissions.length ? assignedPermissions.join(', ') : 'Sin permisos';
  }

  deleteRoles(id: string): void {
    if (confirm('¿Estás seguro que deseas eliminar este rol?')) {
      this.roleService.delete(id).subscribe({
        next: (res) => {
          alert('Vehículo eliminado correctamente.');
          this.showToast(res.message, 'success');
          this.loadRoles(this.currentPage);
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


import { Component, OnInit } from '@angular/core';
import { DriverCreateRequest } from '../../../../models/drivers';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DriversService } from '../drivers-api/drivers.service';
import { CommonModule } from '@angular/common';
import { UserSimple } from 'src/app/models/users';
import { UsersService } from '../../users/users-api/users.service';
@Component({
  selector: 'app-drivers-create',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './drivers-create.component.html',
  styleUrl: './drivers-create.component.scss'
})
export class DriversCreateComponent implements OnInit {

  form!: FormGroup;

  loading = false;

  toasts: { message: string; type: 'success' | 'error'; visible: boolean }[] = [];

  users: UserSimple[] = [];
  loadingUsers = false;

  constructor(
    private fb: FormBuilder,
    private driverService: DriversService,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getUsers();
  }

  // 🔥 FORM CENTRALIZADO
  initForm(): void {
    this.form = this.fb.group({
      user_id: [null, [Validators.required]],
      licencia: [null, [Validators.required]],
      numero_licencia: [null, [Validators.required]],
      vencimiento_licencia: [null, [Validators.required]],
      estado_conductor: ['Activo', [Validators.required]]
    });
  }

  // 🔥 USUARIOS
  getUsers(): void {
    this.loadingUsers = true;

    this.usersService.list_all().subscribe({
      next: (res) => {
        this.users = res.data || [];
        this.loadingUsers = false;
      },
      error: () => {
        this.loadingUsers = false;
        this.showToast('Error cargando usuarios', 'error');
      }
    });
  }

  // 🔥 CREAR DRIVER
  create(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.showToast('Completa todos los campos', 'error');
      return;
    }

    this.loading = true;

    const payload: DriverCreateRequest = {
      user_id: Number(this.form.value.user_id),
      licencia: this.form.value.licencia,
      numero_licencia: this.form.value.numero_licencia,
      vencimiento_licencia: this.form.value.vencimiento_licencia,
      estado_conductor: this.form.value.estado_conductor
    };

    this.driverService.create(payload).subscribe({
      next: ({ success, message }) => {

        this.loading = false;

        if (success) {
          this.showToast(message || 'Conductor creado', 'success');

          // 🔥 RESET TOTAL DEL FORM
          this.resetForm();

        } else {
          this.showToast(message || 'Error al crear', 'error');
        }
      },
      error: (err) => {
        this.loading = false;
        this.showToast(err.error?.message || 'Error de servidor', 'error');
      }
    });
  }

  // 🔥 RESET TOTAL LIMPIO
  resetForm(): void {
    this.form.reset();

    // valores por defecto
    this.form.patchValue({
      estado_conductor: 'Activo'
    });

    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.form.updateValueAndValidity();
  }

  // 🔥 TOASTS
  showToast(message: string, type: 'success' | 'error') {
    const toast = { message, type, visible: true };
    this.toasts.push(toast);

    setTimeout(() => {
      toast.visible = false;

      setTimeout(() => {
        this.toasts = this.toasts.filter(t => t !== toast);
      }, 300);

    }, 3000);
  }

  // 🔥 GETTERS
  get f() {
    return this.form.controls;
  }
}
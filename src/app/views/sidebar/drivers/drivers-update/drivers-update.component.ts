import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DriverCreateRequest, DriverUpdateRequest } from 'src/app/models/drivers';
import { UserSimple } from 'src/app/models/users';
import { DriversService } from '../drivers-api/drivers.service';
import { UsersService } from '../../users/users-api/users.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drivers-update',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './drivers-update.component.html',
  styleUrl: './drivers-update.component.scss'
})
export class DriversUpdateComponent implements OnInit {

  form!: FormGroup;

  driverId!: string;

  users: UserSimple[] = [];

  loading = false;
  loadingDriver = false;
  loadingUsers = false;

  toasts: { message: string; type: 'success' | 'error'; visible: boolean }[] = [];

  constructor(
    private fb: FormBuilder,
    private driverService: DriversService,
    private usersService: UsersService,
    private route: ActivatedRoute
  ) { }

  // ================= INIT (FORMATO QUE PEDISTE) =================
  ngOnInit(): void {
    this.initForm();

    this.driverId = this.route.snapshot.paramMap.get('id')!;

    this.loadDriver(() => {
      this.loadUsers();
    });
  }

  // ================= FORM =================
  initForm(): void {
    this.form = this.fb.group({
      user_id: [null, Validators.required],
      licencia: [null, Validators.required],
      numero_licencia: [null, Validators.required],
      vencimiento_licencia: [null, Validators.required],
      estado_conductor: ['Activo', Validators.required]
    });
  }

  // ================= LOAD DRIVER =================
  loadDriver(callback?: () => void): void {
    this.loadingDriver = true;

    this.driverService.read(this.driverId).subscribe({
      next: (res) => {

        const d = res.data;

        this.form.patchValue({
          user_id: d.user_id,
          licencia: d.licencia,
          numero_licencia: d.numero_licencia,
          vencimiento_licencia: d.vencimiento_licencia,
          estado_conductor: d.estado_conductor
        });

        this.loadingDriver = false;

        if (callback) callback();
      },
      error: () => {
        this.loadingDriver = false;
        this.showToast('Error cargando conductor', 'error');
      }
    });
  }

  // ================= LOAD USERS =================
  loadUsers(): void {
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

  // ================= UPDATE =================
  update(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.showToast('Completa todos los campos', 'error');
      return;
    }

    this.loading = true;

    this.driverService.update(this.driverId, this.form.value).subscribe({
      next: () => {
        this.loading = false;
        this.showToast('Conductor actualizado correctamente', 'success');
      },
      error: (err) => {
        this.loading = false;
        this.showToast(err.error?.message || 'Error actualizando conductor', 'error');
      }
    });
  }

  // ================= TOAST =================
  showToast(message: string, type: 'success' | 'error') {
    const t = { message, type, visible: true };
    this.toasts.push(t);

    setTimeout(() => {
      t.visible = false;
      this.toasts = this.toasts.filter(x => x !== t);
    }, 3000);
  }

  get f() {
    return this.form.controls;
  }
}

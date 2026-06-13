import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TripsService } from '../trips-api/trips.service';
import { VehiclesService } from '../../vehicles/vehicles-api/vehicles.service';
import { CarbodiesService } from '../../carbodies/carbodies-api/carbodies.service';
import { DriversService } from '../../drivers/drivers-api/drivers.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TripRead, TripUpdateResponse } from '../../../../models/trips';
import { VehicleSimple } from '../../../../models/vehicles';
import { CarbodySimple } from '../../../../models/carbodies';
import { DriversSimple } from '../../../../models/drivers';
import { SpinnerComponent } from '@coreui/angular';
import { Expense } from '../../../../models/expenses';

@Component({
  selector: 'app-trips-update',
  imports: [RouterLink, CommonModule, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './trips-update.component.html',
  styleUrl: './trips-update.component.scss'
})
export class TripsUpdateComponent implements OnInit {

  /* Toast */
  toasts: { message: string; type: 'success' | 'error'; visible: boolean }[] = [];


  carbodies: CarbodySimple[] = [];
  vehicles: VehicleSimple[] = [];
  drivers: DriversSimple[] = [];

  loadingDrivers = false;
  loadingCarbodies = false;
  loadingVehicles = false;

  /* Data */
  trip_id: string | null = null;
  trip_data: TripRead | null = null;
  loading = false; // carga inicial
  saving = false; // submit/update

  /* Form */
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private tripService: TripsService,
    private driversService: DriversService,
    private carbodiesService: CarbodiesService,
    private vehiclesService: VehiclesService,
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.trip_id = this.route.snapshot.paramMap.get('id');
    this.loadTrip(() => {
      this.load_drivers();
      this.load_carbodies();
      this.load_vehicles();
    });
  }

  /* =========================
     FORM INIT
  ========================= */
  initForm(): void {
    this.form = this.fb.group({
      factura: ['', Validators.required],
      guia: [''],
      fecha_carga: [''],
      empresa: [''],
      contacto: [''],
      telefono: [''],
      ruc: [''],
      destino: [''],
      carga: [''],

      conductor_id: [null, Validators.required],
      vehiculo_id: [null, Validators.required],
      carroceria_id: [null, Validators.required],

      detalles: [''],
      permisos: [''],

      fecha_estimada_entrega: [''],
      monto_cobrar: [''],
      estado_pago: ['Pendiente'],
      fecha_pago: [null],
      estado_viaje: [''],

      expenses: this.fb.array([])
    });
  }

  get expenses(): FormArray {
    return this.form.get('expenses') as FormArray;
  }

  /* =========================
     LOAD DATA
  ========================= */
  loadTrip(callback?: () => void): void {
    if (!this.trip_id) {
      this.showToast('No se encontró el ID del viaje', 'error');
      return;
    }

    this.loading = true;

    this.tripService.read(this.trip_id).subscribe({
      next: ({ success, data, message }) => {
        if (!success || !data) {
          this.showToast(message || 'Error al cargar el viaje', 'error');
          this.loading = false;
          return;
        }

        this.trip_data = data;

        /* PATCH FORM */
        this.form.patchValue({
          factura: data.factura,
          guia: data.guia,
          fecha_carga: data.fecha_carga,
          empresa: data.empresa,
          contacto: data.contacto,
          telefono: data.telefono,
          ruc: data.ruc,
          destino: data.destino,
          carga: data.carga,
          conductor_id: data.conductor_id,
          vehiculo_id: data.vehiculo_id,
          carroceria_id: data.carroceria_id,
          detalles: data.detalles,
          permisos: data.permisos,
          fecha_estimada_entrega: data.fecha_estimada_entrega,
          estado_viaje: data.estado_viaje,
          monto_cobrar: data.monto_cobrar,
          estado_pago: data.estado_pago,
          fecha_pago: data.fecha_pago
        });

        /* EXPENSES */
        this.expenses.clear();

        if (data.expenses?.length) {
          data.expenses.forEach(exp => this.addExpense(exp));
        }

        this.loading = false;
        callback?.();

      },
      error: () => {
        this.showToast('Error al obtener el viaje', 'error');
        this.loading = false;
      }
    });
  }

  /* =========================
     EXPENSES
  ========================= */
  addExpense(expense?: Expense): void {
    this.expenses.push(
      this.fb.group({
        descripcion: [expense?.descripcion || '', Validators.required],
        precio: [expense?.precio || '', Validators.required]
      })
    );
  }

  removeExpense(index: number): void {
    this.expenses.removeAt(index);
  }

  /* =========================
     SAVE
  ========================= */
  save(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.showToast('Completa los campos obligatorios', 'error');
      return;
    }
    if (!this.trip_id) {
      this.showToast('No se encontró el ID del viaje', 'error');
      return;
    }
    this.saving = true;
    this.tripService.update(this.trip_id, this.form.value).subscribe({

      next: (response) => {
        if (response.success) {
          this.showToast('Viaje actualizado correctamente', 'success');
          // limpiar estados visuales
          this.form.markAsPristine();
          this.form.markAsUntouched();
        } else {
          this.showToast(response.message || 'Error al actualizar', 'error');
        }
        this.saving = false;
      },

      error: (err) => {
        this.showToast(err.error?.message || 'Error al actualizar viaje', 'error');
        this.saving = false;
      }

    });

  }

  load_drivers(): void {
    this.loadingDrivers = true;
    this.form.get('conductor_id')?.disable();
    this.driversService.list_all().subscribe({
      next: (response) => {
        if (response.success) {
          this.drivers = response.data;
        } else {
          this.drivers = [];
          this.showToast(response.message || 'Error al cargar conductores', 'error');
        }
        this.loadingDrivers = false;
        this.form.get('conductor_id')?.enable();
      },
      error: (err) => {
        this.showToast(
          'Error al cargar la lista de conductores: ' +
          (err.error?.message || err.message || ''),
          'error'
        );
        this.loadingDrivers = false;
        this.form.get('conductor_id')?.enable();
      }
    });
  }

  load_vehicles(): void {
    this.loadingVehicles = true;
    this.form.get('vehiculo_id')?.disable();

    this.vehiclesService.list_all().subscribe({
      next: (response) => {
        if (response.success) {
          this.vehicles = response.data;
        } else {
          this.vehicles = [];
          this.showToast(response.message || 'Error al cargar vehículos', 'error');
        }
        this.loadingVehicles = false;
        this.form.get('vehiculo_id')?.enable();
      },
      error: (err) => {
        this.showToast(
          'Error al cargar la lista de vehículos: ' +
          (err.error?.message || err.message || ''),
          'error'
        );
        this.loadingVehicles = false;
        this.form.get('vehiculo_id')?.enable();
      }
    });
  }

  load_carbodies(): void {
    this.loadingCarbodies = true;
    this.form.get('carroceria_id')?.disable();
    this.carbodiesService.list_all().subscribe({
      next: (response) => {
        if (response.success) {
          this.carbodies = response.data;
        } else {
          this.carbodies = [];
          this.showToast(response.message || 'Error al cargar carrocerías', 'error');
        }
        this.loadingCarbodies = false;
        this.form.get('carroceria_id')?.enable();
      },
      error: (err) => {
        this.showToast(
          'Error al cargar la lista de carrocerías: ' +
          (err.error?.message || err.message || ''),
          'error'
        );
        this.loadingCarbodies = false;
        this.form.get('carroceria_id')?.enable();
      }
    });
  }
  /* =========================
     TOAST
  ========================= */
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
    return this.expenses.controls.reduce((sum, control) => {
      return sum + Number(control.get('precio')?.value || 0);
    }, 0);
  }
}

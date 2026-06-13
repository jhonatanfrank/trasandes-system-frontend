import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SpinnerComponent } from '@coreui/angular';
import { TripsService } from '../trips-api/trips.service';
import { Vehicle, VehicleSimple } from '../../../../models/vehicles';
import { CarbodiesService } from '../../carbodies/carbodies-api/carbodies.service';
import { VehiclesService } from '../../vehicles/vehicles-api/vehicles.service';
import { CarBodiesAllResponse, CarBody, CarbodySimple } from '../../../../models/carbodies';
import { DriversService } from '../../drivers/drivers-api/drivers.service';
import { TripCreateResponse } from '../../../../models/trips';
import { DriversSimple } from '../../../../models/drivers';

@Component({
  selector: 'app-trips-create',
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './trips-create.component.html',
  styleUrl: './trips-create.component.scss'
})
export class TripsCreateComponent implements OnInit {

  toasts: { message: string; type: 'success' | 'error'; visible: boolean }[] = [];

  carbodies: CarbodySimple[] = [];
  vehicles: VehicleSimple[] = [];
  drivers: DriversSimple[] = [];

  loading = false;
  loading_vehicles = false;
  loading_2 = false;

  error: string | null = null;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tripsService: TripsService,
    private carbodiesService: CarbodiesService,
    private vehiclesService: VehiclesService,
    private driversService: DriversService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.load_drivers();
    this.load_carbodies();
    this.load_vehicles();
  }

  initForm() {
    this.form = this.fb.group({
      factura: ['', [Validators.required]],
      guia: [''],
      fecha_carga: [''],
      empresa: [''],
      contacto: [''],
      telefono: [''],
      ruc: [''],
      destino: [''],
      carga: [''],
      conductor_id: [null, [Validators.required]],
      vehiculo_id: [null, [Validators.required]],
      carroceria_id: [null, [Validators.required]],
      detalles: [''],
      permisos: [''],
      fecha_estimada_entrega: [''],
      monto_cobrar: [''],
      estado_viaje: [''],
      estado_pago: ['pendiente'],
      fecha_pago: [null],
      expenses: this.fb.array([])
    });
  }

  get expenses(): FormArray {
    return this.form.get('expenses') as FormArray;
  }

  addExpense() {
    this.expenses.push(
      this.fb.group({
        descripcion: ['', [Validators.required]],
        precio: ['', [Validators.required]]
      })
    );
  }

  removeExpense(i: number) {
    this.expenses.removeAt(i);
  }

  load_drivers(): void {
    this.loading_2 = true;
    this.driversService.list_all().subscribe({
      next: (response) => {
        if (response.success) {
          this.drivers = response.data;
          console.log('Conductores cargados:', this.drivers);
        } else {
          this.drivers = [];
          this.showToast(response.message || 'Error al cargar conductores', 'error');
        }
        this.loading_2 = false;
      },
      error: (err) => {
        this.showToast(
          'Error al cargar la lista de conductores: ' +
          (err.error?.message || err.message || ''),
          'error'
        );
        this.loading_2 = false;
      }
    });
  }

  load_carbodies(): void {
    this.loading_2 = true;
    this.carbodiesService.list_all().subscribe({
      next: (response) => {
        if (response.success) {
          this.carbodies = response.data;
          console.log('Carrocerías cargadas:', this.carbodies);
        } else {
          this.carbodies = [];
          this.showToast(response.message || 'Error al cargar carrocerías', 'error');
        }
        this.loading_2 = false;
      },
      error: (err) => {
        this.showToast(
          'Error al cargar la lista de carrocerías: ' +
          (err.error?.message || err.message || ''),
          'error'
        );
        this.loading_2 = false;
      }
    });
  }

  load_vehicles(): void {
    this.loading_vehicles = true;

    this.vehiclesService.list_all().subscribe({
      next: (response) => {
        if (response.success) {
          this.vehicles = response.data;
          console.log('Vehículos cargados:', this.vehicles);
        } else {
          this.vehicles = [];
          this.showToast(response.message || 'Error al cargar vehículos', 'error');
        }
        this.loading_vehicles = false;
      },
      error: (err) => {
        this.showToast(
          'Error al cargar la lista de vehículos: ' +
          (err.error?.message || err.message || ''),
          'error'
        );
        this.loading_vehicles = false;
      }
    });
  }

  save() {

    this.form.markAllAsTouched();
    this.expenses.controls.forEach(group => {
      group.markAllAsTouched();
    });

    if (this.form.invalid) {
      this.showToast('Revisa los campos del formulario', 'error');
      return;
    }

    this.loading = true;

    this.tripsService.create(this.form.value).subscribe({
      next: (resp: TripCreateResponse) => {
        this.loading = false;
        console.log('Viaje creado:', resp.data);
        this.showToast(resp.message, 'success');
        this.form.reset({
          estado_pago: 'pendiente'
        });
        this.expenses.clear();
      },
      error: (err) => {
        this.loading = false;
        this.showToast(err.error?.message || 'Error al crear el viaje', 'error');
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

  get totalPrecio(): number {
    return this.expenses.controls.reduce((sum, control) => {
      return sum + Number(control.get('precio')?.value || 0);
    }, 0);
  }
}

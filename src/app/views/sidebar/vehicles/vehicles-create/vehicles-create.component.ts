import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Vehicle, VehiclesAllResponse, VehicleSimple } from '../../../../models/vehicles';
import { VehiclesService } from '../vehicles-api/vehicles.service';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerComponent } from '@coreui/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vehicles-create',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './vehicles-create.component.html',
  styleUrl: './vehicles-create.component.scss'
})
export class VehiclesCreateComponent {

  /* Toast */
  toasts: { message: string; type: 'success' | 'error'; visible: boolean }[] = [];

  form: FormGroup;
  loading = false;

  /* VALIDACIÓN PLACA */
  isCheckingPlaca = false;
  placaValid: boolean | null = null;

  constructor(
    private fb: FormBuilder,
    private vehiclesService: VehiclesService
  ) {

    this.form = this.fb.group({

      placa: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(7),
          Validators.pattern(/^[A-Za-z0-9]+$/)
        ]
      ],

      tipo: ['', Validators.required],
      marca: [''],
      modelo: [''],
      anio: [],
      gps: [false],
      numero_ejes: [null],
      capacidad_carga: [null],
      peso_seco: [null],
      estado_general: [''],
      observaciones: [''],
      soats: this.fb.array([]),
      fines: this.fb.array([])

    });
    this.initPlacaValidation();
  }

  /* =========================
      GETTERS
  ========================= */

  get soats(): FormArray {
    return this.form.get('soats') as FormArray;
  }

  get fines(): FormArray {
    return this.form.get('fines') as FormArray;
  }

  /* =========================
      SOATS
  ========================= */

  addSoat(): void {
    this.soats.push(
      this.fb.group({
        fecha_vencimiento: ['', Validators.required],
        estado: ['', Validators.required]
      })
    );
  }

  removeSoat(index: number): void {
    this.soats.removeAt(index);
  }

  /* =========================
      FINES
  ========================= */

  addFine(): void {
    this.fines.push(
      this.fb.group({
        descripcion: ['', Validators.required],
        monto: [null, Validators.required],
        pagada: ['', Validators.required]
      })
    );
  }

  removeFine(index: number): void {
    this.fines.removeAt(index);
  }

  /* =========================
      VALIDACIÓN PLACA
  ========================= */

  initPlacaValidation() {

    const control = this.form.get('placa');

    control?.valueChanges.subscribe(value => {

      this.isCheckingPlaca = false;
      this.placaValid = null;

      if (control?.hasError('placaExistente')) {
        const errors = { ...control.errors };
        delete errors['placaExistente'];
        control.setErrors(Object.keys(errors).length ? errors : null);
      }

      if (!value || value.length < 6) return;

      this.isCheckingPlaca = true;

      this.vehiclesService.checkPlacaExists(value).subscribe(res => {

        this.isCheckingPlaca = false;

        const exists = res.data.exists;

        if (exists) {

          this.placaValid = false;

          control.setErrors({
            ...control.errors,
            placaExistente: true
          });

        } else {

          this.placaValid = true;

          if (control?.hasError('placaExistente')) {
            const errors = { ...control.errors };
            delete errors['placaExistente'];
            control.setErrors(Object.keys(errors).length ? errors : null);
          }
        }
      });
    });
  }

  /* =========================
      SUBMIT
  ========================= */

  submit(): void {

    if (this.form.invalid || this.placaValid === false) {

      this.form.markAllAsTouched();

      this.showToast('Revisa los campos del formulario', 'error');

      return;
    }

    this.loading = true;

    this.vehiclesService.create(this.form.value).subscribe({

      next: () => {

        this.loading = false;

        this.showToast('Vehículo creado correctamente', 'success');

        this.form.reset();

        this.placaValid = null;

        this.soats.clear();
        this.fines.clear();
      },

      error: (err) => {
        console.log(this.form.value);
        this.loading = false;

        this.showToast(
          err?.error?.message || 'Error al crear vehículo',
          'error'
        );
      }
    });
  }

  /* =========================
      RESET
  ========================= */

  reset(): void {

    this.form.reset();

    this.placaValid = null;

    this.isCheckingPlaca = false;

    this.soats.clear();

    this.fines.clear();
  }

  /* =========================
      TOAST
  ========================= */

  showToast(
    message: string,
    type: 'success' | 'error' = 'success'
  ) {

    const toast = {
      message,
      type,
      visible: true
    };

    this.toasts.push(toast);

    setTimeout(() => {

      toast.visible = false;

      setTimeout(() => {
        this.toasts = this.toasts.filter(t => t !== toast);
      }, 300);

    }, 3000);
  }

}
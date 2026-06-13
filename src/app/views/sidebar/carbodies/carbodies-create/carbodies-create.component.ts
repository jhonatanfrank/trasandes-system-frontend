import { Component, OnInit } from '@angular/core';
import { CarBody } from '../../../../models/carbodies';
import { CarbodiesService } from '../carbodies-api/carbodies.service';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { SpinnerComponent } from '@coreui/angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VehiclesService } from '../../vehicles/vehicles-api/vehicles.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-carbodies-create',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './carbodies-create.component.html',
  styleUrl: './carbodies-create.component.scss'
})
export class CarbodiesCreateComponent {

  /* Toast */
  toasts: { message: string; type: 'success' | 'error'; visible: boolean }[] = [];


  form: FormGroup;
  loading = false;

  /* 🔥 ESTADOS DE PLACA */
  isCheckingPlaca = false;
  placaValid: boolean | null = null;

  constructor(
    private fb: FormBuilder,
    private carbodiesService: CarbodiesService
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
      capacidad: [''],
      descripcion: [''],
      estado_carbody: ['']
    });
    this.initPlacaValidation();
  }

  /* 🔥 VALIDACIÓN EN VIVO CORREGIDA */
  initPlacaValidation() {
    const control = this.form.get('placa');
    control?.valueChanges.pipe(
      // debounceTime(400),
      // distinctUntilChanged()
    ).subscribe(value => {
      this.isCheckingPlaca = false;
      this.placaValid = null;
      // limpiar error anterior
      if (control?.hasError('placaExistente')) {
        const errors = { ...control.errors };
        delete errors['placaExistente'];
        control.setErrors(Object.keys(errors).length ? errors : null);
      }

      // si no cumple mínimo, no consultar pero tampoco bloquear estado
      if (!value || value.length < 6) return;
      this.isCheckingPlaca = true;
      this.carbodiesService.checkPlacaExists(value).subscribe(res => {
        this.isCheckingPlaca = false;
        const exists = res.data.exists;
        if (exists) {
          this.placaValid = false;
          control.setErrors({ ...control.errors, placaExistente: true });
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

  /* SUBMIT */
  submit(): void {

    if (this.form.invalid || this.placaValid === false) {
      this.form.markAllAsTouched();
      this.showToast('Revisa los campos del formulario', 'error');
      return;
    }

    this.loading = true;

    this.carbodiesService.create(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        this.showToast('Carrocería creada correctamente', 'success');
        this.form.reset();
        this.placaValid = null;
      },
      error: (err) => {
        this.loading = false;
        this.showToast(err?.error?.message || 'Error al crear', 'error');
      }
    });
  }

  reset(): void {
    this.form.reset();
    this.placaValid = null;
    this.isCheckingPlaca = false;
  }

  /* TOAST */
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
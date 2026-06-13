import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarbodiesService } from '../carbodies-api/carbodies.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerComponent } from '@coreui/angular';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-carbodies-update',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, SpinnerComponent],
  templateUrl: './carbodies-update.component.html',
  styleUrl: './carbodies-update.component.scss'
})
export class CarbodiesUpdateComponent implements OnInit {
  toasts: { message: string; type: 'success' | 'error'; visible: boolean }[] = [];

  form: FormGroup;

  loading = false;
  loadingData = false;



  isCheckingPlaca = false;
  placaValid: boolean | null = null;

  private id!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
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
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.loadData();
    this.initPlacaValidation();
  }

  /* LOAD DATA */
  loadData() {

    this.loadingData = true;

    this.carbodiesService.read(String(this.id)).subscribe({
      next: (res) => {
        this.form.patchValue(res.data);
        this.loadingData = false;
      },
      error: () => {
        this.loadingData = false;
        this.showToast('Error al cargar datos', 'error');
      }
    });
  }

  /* 🔥 VALIDACIÓN PLACA */
  initPlacaValidation() {

    const control = this.form.get('placa');

    control?.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(value => {

      this.isCheckingPlaca = true;
      this.placaValid = null;

      if (control?.hasError('placaExistente')) {
        const errors = { ...control.errors };
        delete errors['placaExistente'];
        control.setErrors(Object.keys(errors).length ? errors : null);
      }

      if (!value || value.length < 6) {
        this.isCheckingPlaca = false;
        return;
      }

      this.carbodiesService.checkPlacaExists(value, this.id).subscribe(res => {

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

  /* UPDATE */
  submit() {

    if (this.form.invalid || this.placaValid === false) {
      this.form.markAllAsTouched();
      this.showToast('Revisa los campos del formulario', 'error');
      return;
    }

    this.loading = true;

    this.carbodiesService.update(String(this.id), this.form.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.showToast(res.message, 'success');
      },
      error: (err) => {
        this.loading = false;
        this.showToast(err?.error?.message || 'Error al actualizar', 'error');
      }
    });
  }

  reset() {
    this.loadData();
    this.placaValid = null;
    this.isCheckingPlaca = false;
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

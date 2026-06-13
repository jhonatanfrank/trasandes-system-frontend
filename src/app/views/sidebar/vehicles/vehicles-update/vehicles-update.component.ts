import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SpinnerComponent } from '@coreui/angular';
import { VehiclesService } from '../vehicles-api/vehicles.service';
import { Vehicle } from '../../../../models/vehicles';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicles-update',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink],
  templateUrl: './vehicles-update.component.html',
  styleUrl: './vehicles-update.component.scss'
})
export class VehiclesUpdateComponent implements OnInit {

  /* TOAST */
  toasts: {
    message: string;
    type: 'success' | 'error';
    visible: boolean;
  }[] = [];

  form: FormGroup;

  loading = false;
  loadingData = true;

  vehicleId!: number;
  vehicle!: Vehicle;

  /* VALIDACIÓN PLACA */
  isCheckingPlaca = false;
  placaValid: boolean | null = null;

  constructor(
    private fb: FormBuilder,
    private vehiclesService: VehiclesService,
    private route: ActivatedRoute
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
      anio: [null],

      gps: [0],

      numero_ejes: [null],
      capacidad_carga: [null],
      peso_seco: [null],

      estado_vehiculo: [''],
      observaciones: [''],

      soats: this.fb.array([]),
      fines: this.fb.array([])

    });
  }

  ngOnInit(): void {

    this.vehicleId = Number(this.route.snapshot.paramMap.get('id'));

    this.loadVehicle();

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
      LOAD VEHICLE
  ========================= */

  loadVehicle(): void {

    this.loadingData = true;

    this.vehiclesService.read(this.vehicleId.toString()).subscribe({

      next: (res) => {

        this.vehicle = res.data;

        this.form.patchValue({

          placa: this.vehicle.placa,
          tipo: this.vehicle.tipo,

          marca: this.vehicle.marca,
          modelo: this.vehicle.modelo,
          anio: this.vehicle.anio,

          gps: this.vehicle.gps ? 1 : 0,

          numero_ejes: this.vehicle.numero_ejes,
          capacidad_carga: this.vehicle.capacidad_carga,
          peso_seco: this.vehicle.peso_seco,

          estado_vehiculo: this.vehicle.estado_vehiculo,
          observaciones: this.vehicle.observaciones

        });

        /* SOATS */
        this.soats.clear();

        this.vehicle.soats.forEach((soat: any) => {

          this.soats.push(
            this.fb.group({

              id: [soat.id],

              fecha_vencimiento: [
                soat.fecha_vencimiento,
                Validators.required
              ],

              estado: [
                soat.estado,
                Validators.required
              ]

            })
          );

        });

        /* FINES */
        this.fines.clear();

        this.vehicle.fines.forEach((fine: any) => {

          this.fines.push(
            this.fb.group({

              id: [fine.id],

              descripcion: [
                fine.descripcion,
                Validators.required
              ],

              monto: [
                fine.monto,
                Validators.required
              ],

              pagada: [
                fine.pagada,
                Validators.required
              ]

            })
          );

        });

        this.loadingData = false;
      },

      error: () => {

        this.loadingData = false;

        this.showToast(
          'Error al cargar vehículo',
          'error'
        );
      }
    });
  }

  /* =========================
      SOATS
  ========================= */

  addSoat(): void {

    this.soats.push(
      this.fb.group({

        id: [null],

        fecha_vencimiento: [
          '',
          Validators.required
        ],

        estado: [
          '',
          Validators.required
        ]

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

        id: [null],

        descripcion: [
          '',
          Validators.required
        ],

        monto: [
          null,
          Validators.required
        ],

        pagada: [
          '',
          Validators.required
        ]

      })
    );
  }

  removeFine(index: number): void {
    this.fines.removeAt(index);
  }

  /* =========================
      VALIDACIÓN PLACA
  ========================= */

  initPlacaValidation(): void {

    const control = this.form.get('placa');

    control?.valueChanges.subscribe(value => {

      this.isCheckingPlaca = false;
      this.placaValid = null;

      if (control?.hasError('placaExistente')) {

        const errors = { ...control.errors };

        delete errors['placaExistente'];

        control.setErrors(
          Object.keys(errors).length
            ? errors
            : null
        );
      }

      if (!value || value.length < 6) return;

      /* SI ES LA MISMA PLACA NO VALIDAR */
      if (
        this.vehicle &&
        value === this.vehicle.placa
      ) {

        this.placaValid = true;

        return;
      }

      this.isCheckingPlaca = true;

      this.vehiclesService
        .checkPlacaExists(value, this.vehicleId)
        .subscribe(res => {

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

              control.setErrors(
                Object.keys(errors).length
                  ? errors
                  : null
              );
            }
          }
        });
    });
  }

  /* =========================
      SUBMIT
  ========================= */

  submit(): void {

    if (
      this.form.invalid ||
      this.placaValid === false
    ) {

      this.form.markAllAsTouched();

      this.showToast(
        'Revisa los campos del formulario',
        'error'
      );

      return;
    }

    this.loading = true;

    this.vehiclesService
      .update(this.vehicleId.toString(), this.form.value)
      .subscribe({

        next: (res) => {

          this.loading = false;

          console.log(res.data);
          this.vehicle = res.data;

          this.showToast(
            'Vehículo actualizado correctamente',
            'success'
          );
        },

        error: (err) => {

          this.loading = false;

          this.showToast(
            err?.error?.message ||
            'Error al actualizar vehículo',
            'error'
          );
        }
      });
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

        this.toasts =
          this.toasts.filter(t => t !== toast);

      }, 300);

    }, 3000);
  }
}

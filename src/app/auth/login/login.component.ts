import { Component } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardGroupComponent,
  ColComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  RowComponent,
} from '@coreui/angular';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [

    ButtonDirective,
    FormsModule,
    CommonModule,
  ],
})
export class LoginComponent {
  user: string = '';
  password: string = '';
  isLoading: boolean = false;

  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';
  toastVisible: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    if (this.isLoading) return;

    this.isLoading = true;

    this.authService.login(this.user, this.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.showToast('Inicio de sesión exitoso', 'success');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;

        const message = err?.error?.message || 'Credenciales incorrectas';

        this.showToast(message, 'error');
      },
    });
  }

  showToast(message: string, type: 'success' | 'error' = 'success') {
    this.toastMessage = message;
    this.toastType = type;
    this.toastVisible = true;

    setTimeout(() => {
      this.toastVisible = false;
    }, 3000); // Se oculta a los 3 segundos
  }

}

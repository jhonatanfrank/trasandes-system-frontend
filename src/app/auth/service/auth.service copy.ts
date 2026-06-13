import { URL_SERVICIOS } from './../../config/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthUser } from '../../models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private LOGIN_URL = `${URL_SERVICIOS}/auth/login`;
  private ME_URL = `${URL_SERVICIOS}/auth/me`;

  private tokenKey = 'authToken';
  private permissions: string[] = [];

  private permissionsSubject = new BehaviorSubject<string[]>([]);
  public permissions$ = this.permissionsSubject.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.LOGIN_URL, { email, password }).pipe(
      tap(response => {
        if (response.access_token) {
          this.setToken(response.access_token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('user_id');
    this.router.navigate(['/login']);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.getUser().subscribe(user => {
      localStorage.setItem('user_id', String(user.id));
    });
  }

  setUserPermissions(perms: string[]) {
    // console.log('Seteando permisos:', perms);
    this.permissionsSubject.next(perms);
  }

  hasPermission(permission: string): boolean {
    return this.permissionsSubject.getValue().includes(permission);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }

  getUser(): Observable<AuthUser> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }

    return this.httpClient.post<AuthUser>(this.ME_URL, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

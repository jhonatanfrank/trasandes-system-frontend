import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { authenticatedGuard } from './auth/guards/authenticated.guard';
import { permissionGuard } from './auth/guards/permission.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    loadComponent: () => import('./views/layout').then(m => m.DefaultLayoutComponent),
    canActivate: [authGuard],
    data: { title: 'Home' },
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./views/sidebar/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [permissionGuard],
        data: { permission: 'dashboard' }
      },
      {
        path: 'roles',
        children: [
          {
            path: 'list',
            loadComponent: () =>
              import('./views/sidebar/roles/roles-list/roles-list.component').then(m => m.RolesListComponent),
            canActivate: [permissionGuard],
            data: { permission: 'list_role' }
          },
          {
            path: 'create',
            loadComponent: () =>
              import('./views/sidebar/roles/roles-create/roles-create.component').then(m => m.RolesCreateComponent),
            canActivate: [permissionGuard],
            data: { permission: 'create_role' }
          },
          {
            path: 'read/:id',
            loadComponent: () =>
              import('./views/sidebar/roles/roles-read/roles-read.component').then(m => m.RolesReadComponent),
            canActivate: [permissionGuard],
            data: { permission: 'read_role' }
          },
          {
            path: 'update/:id',
            loadComponent: () =>
              import('./views/sidebar/roles/roles-update/roles-update.component').then(m => m.RolesUpdateComponent),
            canActivate: [permissionGuard],
            data: { permission: 'update_role' }
          },
        ],
      },
      {
        path: 'vehicles',
        children: [
          {
            path: 'list',
            loadComponent: () =>
              import(
                './views/sidebar/vehicles/vehicles-list/vehicles-list.component'
              ).then((m) => m.VehiclesListComponent),
            canActivate: [permissionGuard],
            data: { permission: 'list_vehicle' }
          },
          {
            path: 'create',
            loadComponent: () =>
              import(
                './views/sidebar/vehicles/vehicles-create/vehicles-create.component'
              ).then((m) => m.VehiclesCreateComponent),
            canActivate: [permissionGuard],
            data: { permission: 'create_vehicle' }
          },
          {
            path: 'read/:id',
            loadComponent: () =>
              import(
                './views/sidebar/vehicles/vehicles-read/vehicles-read.component'
              ).then((m) => m.VehiclesReadComponent),
            canActivate: [permissionGuard],
            data: { permission: 'read_vehicle' }
          },
          {
            path: 'update/:id',
            loadComponent: () =>
              import(
                './views/sidebar/vehicles/vehicles-update/vehicles-update.component'
              ).then((m) => m.VehiclesUpdateComponent),
            canActivate: [permissionGuard],
            data: { permission: 'update_vehicle' }
          },
        ],
      },
      {
        path: 'carbodies',
        children: [
          {
            path: 'list',
            loadComponent: () =>
              import(
                './views/sidebar/carbodies/carbodies-list/carbodies-list.component'
              ).then((m) => m.CarbodiesListComponent),
            canActivate: [permissionGuard],
            data: { permission: 'list_carbody' }
          },
          {
            path: 'create',
            loadComponent: () =>
              import(
                './views/sidebar/carbodies/carbodies-create/carbodies-create.component'
              ).then((m) => m.CarbodiesCreateComponent),
            canActivate: [permissionGuard],
            data: { permission: 'create_carbody' }
          },
          {
            path: 'read/:id',
            loadComponent: () =>
              import(
                './views/sidebar/carbodies/carbodies-read/carbodies-read.component'
              ).then((m) => m.CarbodiesReadComponent),
            canActivate: [permissionGuard],
            data: { permission: 'read_carbody' }
          },
          {
            path: 'update/:id',
            loadComponent: () =>
              import(
                './views/sidebar/carbodies/carbodies-update/carbodies-update.component'
              ).then((m) => m.CarbodiesUpdateComponent),
            canActivate: [permissionGuard],
            data: { permission: 'update_carbody' }
          },
        ],
      },
      {
        path: 'drivers',
        children: [
          {
            path: 'list',
            loadComponent: () =>
              import(
                './views/sidebar/drivers/drivers-list/drivers-list.component'
              ).then((m) => m.DriversListComponent),
            canActivate: [permissionGuard],
            data: { permission: 'list_driver' }
          },
          {
            path: 'create',
            loadComponent: () =>
              import(
                './views/sidebar/drivers/drivers-create/drivers-create.component'
              ).then((m) => m.DriversCreateComponent),
            canActivate: [permissionGuard],
            data: { permission: 'create_driver' }
          },
          {
            path: 'read/:id',
            loadComponent: () =>
              import(
                './views/sidebar/drivers/drivers-read/drivers-read.component'
              ).then((m) => m.DriversReadComponent),
            canActivate: [permissionGuard],
            data: { permission: 'read_driver' }
          },
          {
            path: 'update/:id',
            loadComponent: () =>
              import(
                './views/sidebar/drivers/drivers-update/drivers-update.component'
              ).then((m) => m.DriversUpdateComponent),
            canActivate: [permissionGuard],
            data: { permission: 'update_driver' }
          },
        ],
      }, {
        path: 'trips',
        children: [
          {
            path: 'list',
            loadComponent: () =>
              import(
                './views/sidebar/trips/trips-list/trips-list.component'
              ).then((m) => m.TripsListComponent),
            canActivate: [permissionGuard],
            data: { permission: 'list_trip' }
          },
          {
            path: 'create',
            loadComponent: () =>
              import(
                './views/sidebar/trips/trips-create/trips-create.component'
              ).then((m) => m.TripsCreateComponent),
            canActivate: [permissionGuard],
            data: { permission: 'create_trip' }
          },
          {
            path: 'read/:id',
            loadComponent: () =>
              import(
                './views/sidebar/trips/trips-read/trips-read.component'
              ).then((m) => m.TripsReadComponent),
            canActivate: [permissionGuard],
            data: { permission: 'read_trip' }
          },
          {
            path: 'update/:id',
            loadComponent: () =>
              import(
                './views/sidebar/trips/trips-update/trips-update.component'
              ).then((m) => m.TripsUpdateComponent),
            canActivate: [permissionGuard],
            data: { permission: 'update_trip' }
          },
        ],
      },

    ]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
    // canActivate: [authenticatedGuard],
    data: { title: 'Login Page' }
  },
  { path: '**', redirectTo: 'dashboard' }
];

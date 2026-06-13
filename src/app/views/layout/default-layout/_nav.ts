import { INavData } from '@coreui/angular';

export interface CustomNavData extends INavData {
  permission?: string;
  children?: CustomNavData[];
}

export const navItems: CustomNavData[] = [

  {
    name: 'Dashboard',
    title: true
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    permission: 'dashboard',
  }, {
    name: 'Roles y Permisos',
    title: true
  },
  {
    name: 'Roles y Permisos',
    url: '/roles',
    iconComponent: { name: 'cil-user-follow' },
    permission: 'list_role',
    children: [
      {
        name: 'Listar',
        url: '/roles/list',
        icon: 'cil-list',
        permission: 'list_role'
      },
      {
        name: 'Crear',
        url: '/roles/create',
        icon: 'cil-plus',
        permission: 'create_role'
      }
    ]
  },
  {
    name: 'Módulo',
    title: true
  },
  {
    name: 'Vehículos',
    url: '/vehicles',
    iconComponent: { name: 'cil-truck' },
    permission: 'list_vehicle',
    children: [
      {
        name: 'Listar',
        url: '/vehicles/list',
        icon: 'cil-list',
        permission: 'list_vehicle'
      },
      {
        name: 'Crear',
        url: '/vehicles/create',
        icon: 'cil-plus',
        permission: 'create_vehicle'
      }
    ]
  },
  {
    name: 'Carrocería',
    url: '/carbodies',
    iconComponent: { name: 'cil-layers' },
    permission: 'list_carbody',
    children: [
      {
        name: 'Listar',
        url: '/carbodies/list',
        icon: 'cil-list',
        permission: 'list_carbody'
      },
      {
        name: 'Crear',
        url: '/carbodies/create',
        icon: 'cil-plus',
        permission: 'create_carbody'
      }
    ]
  },
  {
    name: 'Conductores',
    url: '/drivers',
    iconComponent: { name: 'cil-user' },
    permission: 'list_driver',
    children: [
      {
        name: 'Listar',
        url: '/drivers/list',
        icon: 'cil-list',
        permission: 'list_driver'
      },
      {
        name: 'Crear',
        url: '/drivers/create',
        icon: 'cil-plus',
        permission: 'create_driver'
      }
    ]
  },
  {
    name: 'Viajes',
    url: '/trips',
    iconComponent: { name: 'cil-map' },
    permission: 'list_trip',
    children: [
      {
        name: 'Listar',
        url: '/trips/list',
        icon: 'cil-list',
        permission: 'list_trip'
      },
      {
        name: 'Crear',
        url: '/trips/create',
        icon: 'cil-plus',
        permission: 'create_trip'
      }
    ]
  }

];

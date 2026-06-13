export interface DriversResponse {
  success: boolean;
  message: string;
  data: DriversData;
}

export interface DriverResponse {
  success: boolean;
  message: string;
  data: Driver;
}

export interface DriverDeleteResponse {
  success: boolean;
  message: string;
}

export interface DriversData {
  current_page: number;
  data: Driver[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface Driver {
  id: number;
  user_id: number;
  licencia: string;
  numero_licencia: string | null;
  vencimiento_licencia: string | null;
  examen_medico_al_dia: boolean;
  estado_conductor: 'Activo' | 'Inactivo';
  created_at: string;
  updated_at: string;
  user: User;
}

export interface DriverCreateRequest {
  user_id: number;
  licencia: string;
  numero_licencia: string;
  vencimiento_licencia: string;
  estado_conductor: 'Activo' | 'Inactivo';
}

export interface DriverCreateResponse {
  success: boolean;
  message: string;
  data: Driver;
}

export interface DriverUpdateRequest {
  user_id: number;
  licencia: string;
  numero_licencia: string;
  vencimiento_licencia: string;
  estado_conductor: 'Activo' | 'Inactivo';
}

export interface DriverUpdateResponse {
  success: boolean;
  message: string;
  data: Driver;
}

export interface User {
  id: number;
  name: string;
  email: string;
  distrito: string | null;
  dni: string | null;
  fecha_nacimiento: string | null;
  fecha_ingreso: string | null;
  metodo_contrato: string | null;
  estado: 'activo' | 'inactivo' | 'suspendido';
  numero_cuenta: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

/* Respuesta lista de todos los conductores sin paginación */
export interface DriversAllResponse {
  success: boolean;
  message: string;
  data: DriversSimple[];
}

/* Atributos básicos del conductor para dropdowns u otras vistas simplificadas */
export interface DriversSimple {
  id: number,
  name: string,
  deleted_at: string | null;
}
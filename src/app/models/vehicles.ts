import { Fine } from "./fine";
import { Soat } from "./soat";

/* Respuesta lista de vehiculos con paginación */
export interface VehiclesListResponse {
  success: boolean;
  message: string;
  data: VehiclesData;
}

/* Respuesta lista de todos los vehículos sin paginación */
export interface VehiclesAllResponse {
  success: boolean;
  message: string;
  data: VehicleSimple[];
}

/* Respuesta de lectura de un vehículo */
export interface VehicleReadResponse {
  success: boolean;
  message: string;
  data: Vehicle;
}

/* Respuesta de actualización de un vehículo */
export interface VehicleUpdateResponse {
  success: boolean;
  message: string;
  data: Vehicle;
}

export interface VehicleUpdateRequest {
  placa: string;
  tipo: string | null;
  marca?: string | null;
  modelo?: string | null;
  anio?: number | null;
  gps?: boolean;
  numero_ejes?: number | null;
  capacidad_carga?: number | null;
  peso_seco?: number | null;
  estado_vehiculo?: string | null;
  observaciones?: string | null;
  soats: Soat[];
  fines: Fine[];
}

/* Respuesta de validación de placa existente */
export interface VehicleExistsResponse {
  success: boolean;
  message: string;
  data: {
    exists: boolean;
  };
}

/* Respuesta de creación de un vehículo */
export interface VehicleCreateResponse {
  success: boolean;
  message: string;
  data: Vehicle;
}

export interface VehicleCreateRequest {
  placa: string;
  tipo: string | null;
  marca: string | null;
  modelo: string | null;
  anio: number | null;
  gps: boolean;
  numero_ejes: number | null;
  capacidad_carga: number | null;
  peso_seco: number | null;
  estado_vehiculo: string | null;
  observaciones: string | null;
  soats: Soat[];
  fines: Fine[];
}

/* Respuesta de la eliminación de un vehículo */
export interface VehicleDeleteResponse {
  success: boolean;
  message: string;
}

/* Atributos de la lista de vehículos */
export interface VehiclesData {
  current_page: number;
  data: Vehicle[];
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

/* Atributos del vehículo */
export interface Vehicle {
  id: number;
  placa: string;
  tipo: string | null;
  marca: string | null;
  modelo: string | null;
  anio: number | null;
  gps: boolean;
  numero_ejes: number | null;
  capacidad_carga: number | null;
  peso_seco: number | null;
  estado_vehiculo: string | null;
  observaciones: string | null;
  created_at: string;
  updated_at: string;
  soats: Soat[];
  fines: Fine[];
}

/* Atributos básicos del vehículo para dropdowns u otras vistas simplificadas */
export interface VehicleSimple {
  id: number;
  placa: string;
  deleted_at: string | null;
}

/* Atributos de paginación */
export interface PaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}




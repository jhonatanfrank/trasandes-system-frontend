import { Driver } from "./drivers";
import { Vehicle } from "./vehicles";
import { CarBody } from "./carbodies";
import { Expense } from "./expenses";

export interface TripsListResponse {
  success: boolean;
  message: string;
  data: TripsData;
}

export interface TripsData {
  current_page: number;
  data: TripPagination[];
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

export interface PaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface TripPagination {
  id: number;
  empresa?: string;
  destino?: string;
  carga?: string;
  conductor?: string;
  vehiculo?: string;
  carroceria?: string;
  monto_cobrar?: string;
  estado_pago?: string;
  fecha_carga?: string | null;
  estado_viaje?: string;
}


export interface TripReadResponse {
  success: boolean;
  message: string;
  data: TripRead;
}

export interface TripDeleteResponse {
  success: boolean;
  message: string;
}

export interface TripRead {
  id: number;
  factura: string;
  guia: string;
  fecha_carga: string;
  empresa: string;
  contacto: string;
  telefono: string;
  ruc: string;
  destino: string;
  carga: string;
  detalles: string;
  permisos: string;
  fecha_estimada_entrega: string;
  monto_cobrar: string;
  estado_pago: string;
  fecha_pago: string | null;
  conductor_id: number;
  vehiculo_id: number;
  carroceria_id: number;
  created_at: string;
  updated_at: string;
  vehicle: Vehicle | null;
  car_body: CarBody | null;
  driver: Driver | null;
  expenses: Expense[];
  estado_viaje: string | null;
}

export interface TripCreateResponse {
  success: boolean;
  message: string;
  data: TripRead;
}

export interface TripCreateRequest {
  factura: string;
  guia: string;
  fecha_carga: string;
  empresa: string;
  contacto: string;
  telefono: string;
  ruc: string;
  destino: string;
  carga: string;
  conductor_id: number;
  vehiculo_id: number;
  carroceria_id: number;
  detalles: string;
  permisos: string;
  fecha_estimada_entrega: string;
  monto_cobrar: string;
  estado_pago: string;
  fecha_pago: string | null;
  estado_viaje: string | null;
  expenses: Expense[];
}

export interface TripUpdateResponse {
  success: boolean;
  message: string;
  data: TripRead;
}

export interface TripUpdateRequest {
  factura?: string;
  guia?: string;
  fecha_carga?: string;
  empresa?: string;
  contacto?: string;
  telefono?: string;
  ruc?: string;
  destino?: string;
  carga?: string;
  conductor_id?: number | null;
  vehiculo_id?: number | null;
  carroceria_id?: number | null;
  detalles?: string;
  permisos?: string;
  fecha_estimada_entrega?: string;
  monto_cobrar?: string;
  estado_pago?: string;
  fecha_pago?: string | null;
  // estado_viaje?: string | null;
  expenses?: Expense[];
}

/* Respuesta lista de vehiculos con paginación */
export interface CarBodiesPaginationResponse {
  success: boolean;
  message: string;
  data: CarBodiesData;
}

/* Respuesta lista de todas las carrocerias sin paginación */
export interface CarBodiesAllResponse {
  success: boolean;
  message: string;
  data: CarbodySimple[];
}

/* Respuesta de lectura de una carroceria */
export interface CarBodyReadResponse {
  success: boolean;
  message: string;
  data: CarBody;
}

/* Respuesta de actualización de una carroceria */
export interface CarBodyUpdateResponse {
  success: boolean;
  message: string;
  data: CarBody;
}

/* Respuesta de creación de una carroceria */
export interface CarBodyCreateResponse {
  success: boolean;
  message: string;
  data: CarBody;
}

export interface CarBodyDeleteResponse {
  success: boolean;
  message: string;
}

/* Atributos de la lista de carrocerias */
export interface CarBodiesData {
  current_page: number;
  data: CarBody[];
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

export interface CarBodyUpdateRequest {
  placa: string;
  capacidad: number;
  descripcion?: string;
  estado_carbody?: string;
}

/* Atributos de la carroceria */
export interface CarBody {
  id: number;
  placa: string;
  capacidad: number;
  descripcion: string | null;
  estado_carbody: string | null;
  imagen: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

/* Respuesta de validación de placa existente */
export interface CarBodyExistsResponse {
  success: boolean;
  message: string;
  data: {
    exists: boolean;
  };
}

/* Atributos básicos de la carroceria para dropdowns u otras vistas simplificadas */
export interface CarbodySimple {
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

/* Atributos para crear una nueva carroceria */
export interface CarBodyCreateRequest {
  placa: string;
  capacidad: number;
  descripcion?: string;
  estado_carbody?: string;
}
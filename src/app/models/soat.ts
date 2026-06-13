export interface Soat {
  id: number;
  vehicle_id: number;
  fecha_vencimiento: string;
  dias_vencidos: number | null;
  estado: 'ACTIVO' | 'VENCIDO' | string;
  created_at: string;
  updated_at: string;
}

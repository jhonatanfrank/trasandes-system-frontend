export interface LicenciasVencerseResponse {
    success: boolean;
    message: string;
    data: LicenciaVencerse[];
}

export interface LicenciaVencerse {
    conductor: string;
    licencia: string;
    fecha_vencimiento: string;
}

export interface InfoCardsResponse {
    success: boolean;
    message: string;
    data: InfoCards[];
}

export interface InfoCards {
    concepto: string;
    total: number;
    detalle: string;
}

export interface EstadoViajesResponse {
    success: boolean;
    message: string;
    data: EstadoViajes[];
}

export interface EstadoViajes {
    id: number;
    conductor: string;
    vehiculo: string;
    destino: string;
    fecha: string;
    estado: string;
}

export interface EstadoViajesResumenResponse {
    success: boolean;
    message: string;
    data: EstadoViajesResumen[];
}

export interface EstadoViajesResumen {
    estado_viaje: string;
    total: number;
}

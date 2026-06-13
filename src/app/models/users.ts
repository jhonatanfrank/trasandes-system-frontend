export interface UserSimple {
    id: number;
    name: string;
}

/* Respuesta lista de todas las usuarios sin paginación */
export interface UsersAllResponse {
    success: boolean;
    message: string;
    data: UserSimple[];
}
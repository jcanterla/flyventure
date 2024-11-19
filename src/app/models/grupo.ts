import {Usuario} from "./usuario";

export interface Sugerencia {
  id: number;
  imagen: string;
  lugar: string;
  ubicacion: string;
}

export interface Grupo {
  id?: number;
  nombre?: string;
  usuarios?: Usuario[];
  itinerarios?: any[];
  notas?: any[];
  sugerencias?: Sugerencia[];
  ubicaciones?: any[];
  gastos?: any[];
  chats?: any[];
  creador?: Usuario;
}

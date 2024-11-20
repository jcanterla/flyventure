import {Usuario} from "./usuario";
import {Sugerencia} from "./sugerencia";

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

import { Sugerencia } from './sugerencia';
import { Voto } from './voto';

export interface ActividadVotoDTO {
  sugerencia: Sugerencia;
  votos: Voto[];
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grupo } from '../models/grupo';
import { Usuario } from '../models/usuario';
import { ActividadVotoDTO } from '../models/ActividadVotosDTO';
import {Sugerencia} from "../models/sugerencia";
import {Voto} from "../models/voto";

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  private apiUrl = 'api/grupos';

  constructor(private http: HttpClient) { }

  getGruposByUsuarioId(usuarioId: number): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.apiUrl}/usuarios/${usuarioId}`);
  }

  crearGrupo(nombre: string, usuario: Usuario): Observable<Grupo> {
    const payload = { nombre, creador: usuario, usuarios: [usuario] };
    return this.http.post<Grupo>(this.apiUrl, payload);
  }

  unirseGrupo(grupoId: number, usuarioId: number | undefined): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${grupoId}/usuarios`, { usuarioId });
  }

  getUsuariosByGrupoId(groupId: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios?grupoId=${groupId}`);
  }

  anyadirUsuarioGrupo(groupId: number, userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuarios/nuevo?grupoId=${groupId}&usuarioId=${userId}`, {});
  }

  eliminarUsuarioGrupo(groupId: number, userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuarios/eliminar?grupoId=${groupId}&usuarioId=${userId}`);
  }

  getSugerencias(groupId: number): Observable<ActividadVotoDTO[]> {
    return this.http.get<ActividadVotoDTO[]>(`${this.apiUrl}/actividad/${groupId}`);
  }

  proponerActividad(usuarioId: number, sugerencia: Sugerencia): Observable<Sugerencia> {
    const url = `${this.apiUrl}/sugerencias/nueva?usuarioId=${usuarioId}`;
    return this.http.post<Sugerencia>(url, sugerencia);
  }

  votarActividad(sugerenciaId: number, usuarioId: number, voto: boolean): Observable<Voto> {
    const url = `${this.apiUrl}/sugerencias/votar?sugerenciaId=${sugerenciaId}&usuarioId=${usuarioId}&voto=${voto}`;
    return this.http.post<Voto>(url, {});
  }

  eliminarVotoActividad(sugerenciaId: number, usuarioId: number): Observable<void> {
    const url = `${this.apiUrl}/sugerencias/votar?sugerenciaId=${sugerenciaId}&usuarioId=${usuarioId}`;
    return this.http.delete<void>(url);
  }

  getUserVote(sugerenciaId: number, usuarioId: number): Observable<Voto | null> {
    const url = `${this.apiUrl}/sugerencias/voto?sugerenciaId=${sugerenciaId}&usuarioId=${usuarioId}`;
    return this.http.get<Voto | null>(url);
  }
}

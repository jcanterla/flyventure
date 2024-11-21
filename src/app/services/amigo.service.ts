import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Amigo } from '../models/amigo';

@Injectable({
  providedIn: 'root'
})
export class AmigoService {
  private apiUrl = 'api/amigos';

  constructor(private http: HttpClient) { }

  getAmigosByUsuarioId(usuarioId: number): Observable<Amigo[]> {
    return this.http.get<Amigo[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ComunService {


  constructor(private http: HttpClient) {
  }

  autorizarPeticion() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    return {headers: headers}
  }
}

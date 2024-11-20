import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { Grupo } from "./models/grupo";
import { GrupoService } from "./services/grupo-service.service";
import { CommonModule } from "@angular/common";
import {
  IonApp, IonContent, IonHeader, IonItem, IonList, IonMenu,
  IonRouterOutlet, IonTitle, IonToolbar
} from '@ionic/angular/standalone';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonMenu, CommonModule],
})
export class AppComponent implements OnInit {
  grupos: Grupo[] = [];

  constructor(private router: Router, private grupoService: GrupoService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadGrupos();
    });
  }

  ngOnInit() {
    this.loadGrupos();
  }

  loadGrupos() {
    const usuarioId = 3;
    this.grupoService.getGruposByUsuarioId(usuarioId).subscribe({
      next: (data) => {
        this.grupos = data;
      },
      error: (error) => console.error('Error:', error),
      complete: () => console.log('Request complete')
    });
  }

  navigateToCentral() {
    this.router.navigate(['/home']);
  }

  navigateToRetroceso() {
    this.router.navigate(['/menu']);
  }

  navigateToPerfil() {
    this.router.navigate(['/perfil']);
  }

  cerrarSesion() {
    this.router.navigate(['/registro']);
  }

  navigateToHomeWithGroup(groupId: number | undefined) {
    this.router.navigate([`/home/${groupId}`]);
  }

  navigateToAmigos() {
    this.router.navigate(['/amigos']);
  }
}

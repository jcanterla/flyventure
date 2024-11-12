import {Component, OnInit} from '@angular/core';
import {
  IonApp, IonButtons,
  IonCol, IonContent,
  IonFooter,
  IonHeader, IonItem, IonList, IonMenu,
  IonRouterOutlet,
  IonRow, IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Router} from "@angular/router";
import {Grupo} from "./models/grupo";
import {GrupoService} from "./services/grupo-service.service";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonRow, IonCol, IonFooter, IonTitle, IonContent, IonButtons, IonList, IonItem, IonMenu, CommonModule],
})
export class AppComponent implements OnInit {

  grupos: Grupo[] = [];

  constructor(private router: Router, private GrupoService: GrupoService) {}

  ngOnInit() {
    this.GrupoService.getGrupos().subscribe({
      next: (data) => this.grupos = data,
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
}

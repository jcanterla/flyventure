import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonFooter, IonMenuButton
} from '@ionic/angular/standalone';
import {Router} from "@angular/router";
import {AlertController, MenuController} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonFooter, IonMenuButton],
})
export class HomePage {
  constructor(private router: Router, private alertController: AlertController, private menu: MenuController) {}

  async presentShareAlert() {
    const alert = await this.alertController.create({
      header: 'Compartir',
      message: 'Compartido',
      buttons: ['OK']
    });

    await alert.present();
  }

  navigateToItinerario() {
    this.router.navigate(['/itinerario']);
  }

  navigateToUbicacion() {
    this.router.navigate(['/ubicacion']);
  }

  navigateToNotas() {
    this.router.navigate(['/notas']);
  }

  navigateToGastos() {
    this.router.navigate(['/gastos']);
  }

  navigateToSugerencias() {
    this.router.navigate(['/sugerencias']);
  }

  navigateToCentral() {
    this.router.navigate(['/home']);
  }

  navigateToRetroceso() {
    this.router.navigate(['/chat']);
  }

  openMenu() {
    this.menu.enable(true, 'mainMenu'); // Habilita el menú con el ID 'mainMenu'
    this.menu.open('mainMenu'); // Abre el menú con el ID 'mainMenu'
  }
}

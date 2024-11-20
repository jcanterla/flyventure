import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, MenuController, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class HomePage implements OnInit {
  groupId: number | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private menu: MenuController
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.groupId = +params['groupId'];
    });
  }

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
    this.router.navigate([`/sugerencias/${this.groupId}`]);
  }

  navigateToParticipantes() {
    if (this.groupId !== undefined) {
      this.router.navigate([`/participantes/${this.groupId}`]);
    }
  }

  navigateToCentral() {
    if (this.groupId !== undefined) {
      this.router.navigate([`/home/${this.groupId}`]);
    } else {
      this.router.navigate(['/menu']);
    }
  }

  navigateToRetroceso() {
    this.router.navigate(['/chat']);
  }

  openMenu() {
    this.menu.enable(true, 'mainMenu');
    this.menu.open('mainMenu');
  }
}

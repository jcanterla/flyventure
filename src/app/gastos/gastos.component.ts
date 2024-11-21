import { Component, OnInit } from '@angular/core';
import {IonicModule, MenuController} from "@ionic/angular";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {IonMenuButton} from "@ionic/angular/standalone";

@Component({
    selector: 'app-gastos',
    templateUrl: './gastos.component.html',
    styleUrls: ['./gastos.component.scss'],
    standalone: true,
  imports: [
    IonicModule,
    FormsModule,
  ]
})
export class GastosComponent {

  constructor(private router: Router, private menu: MenuController) { }


  navigateToCentral() {
    this.router.navigate(['/menu']);
  }

  navigateToRetroceso() {
    this.router.navigate(['/chat']);
  }

  openMenu() {
    this.menu.enable(true, 'mainMenu'); // Habilita el menú con el ID 'mainMenu'
    this.menu.open('mainMenu'); // Abre el menú con el ID 'mainMenu'
  }

}

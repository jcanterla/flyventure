import { Component, OnInit } from '@angular/core';
import {IonicModule, MenuController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class NotasComponent {

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

import { Component, OnInit } from '@angular/core';
import {
  IonCard,
  IonCol,
  IonContent, IonFooter,
  IonGrid, IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow, IonToolbar
} from "@ionic/angular/standalone";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonContent,
    IonGrid,
    IonInput,
    IonItem,
    IonList,
    IonRow,
    IonLabel,
    IonCol,
    IonHeader,
    IonToolbar,
    IonFooter
  ]
})
export class RegistroComponent{

  constructor(private router: Router) { }


  navigateToCentral() {
    this.router.navigate(['/registro']);
  }


  navigateToLogin() {
    this.router.navigate(['/login']);
  }

}

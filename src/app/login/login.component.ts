import { Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCol,
  IonContent, IonFooter,
  IonGrid, IonHeader,
  IonInput,
  IonItem, IonLabel,
  IonList, IonModal,
  IonRow, IonToolbar
} from "@ionic/angular/standalone";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonContent,
    IonGrid,
    IonRow,
    IonItem,
    IonInput,
    IonList,
    IonButton,
    IonCol,
    IonHeader,
    IonToolbar,
    IonFooter,
    IonLabel,
    IonModal
  ]
})
export class LoginComponent {

  constructor(private router: Router) { }


  navigateToCentral() {
    this.router.navigate(['/login']);
  }

  navigateToRetroceso() {
    this.router.navigate(['/registro']);
  }

  navigateToMenu() {
    this.router.navigate(['/menu']);
  }



}

import { Component, OnInit } from '@angular/core';
import { IonicModule, MenuController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Amigo } from '../models/amigo';
import { AmigoService } from "../services/amigo.service";
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  styleUrls: ['./amigos.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgForOf
  ]
})
export class AmigosComponent implements OnInit {
  amigos: { nombre: any }[] = [];

  constructor(private router: Router, private menu: MenuController, private amigoService: AmigoService) { }

  ngOnInit() {
    this.loadAmigos();
  }

  loadAmigos() {
    const usuarioId = 3;
    this.amigoService.getAmigosByUsuarioId(usuarioId).subscribe(
      (data) => {
        console.log('Raw data:', data);
        this.amigos = data.map((amigo: any) => {
          console.log('Amigo:', amigo);
          return { nombre: amigo.amigo.usuario };
        });
        console.log(this.amigos);
      },
      (error) => {
        console.error('Error fetching amigos', error);
      }
    );
  }
  navigateToCentral() {
    this.router.navigate(['/menu']);
  }

  navigateToRetroceso() {
    this.router.navigate(['/chat']);
  }

  openMenu() {
    this.menu.enable(true, 'mainMenu');
    this.menu.open('mainMenu');
  }
}

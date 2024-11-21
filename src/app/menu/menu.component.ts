import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { Router } from "@angular/router";
import { MenuController } from "@ionic/angular";
import { GrupoService } from "../services/grupo-service.service";
import { Usuario } from "../models/usuario";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { IonicModule } from '@ionic/angular';
import { UsuarioService } from "../services/usuario.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, IonicModule],
})
export class MenuComponent implements OnInit {
  nombreGrupo: string = '';
  grupoId: number | undefined;
  usuario: Usuario | undefined;

  @Output() grupoCreado = new EventEmitter<void>();

  constructor(
    private router: Router,
    private menu: MenuController,
    private grupoService: GrupoService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuarioService.getUsuarioById(3).subscribe({
      next: (data) => {
        this.usuario = data;
      },
      error: (error) => console.error('Error al obtener el usuario:', error)
    });
  }

  crearGrupo() {
    if (this.nombreGrupo.trim() && this.usuario) {
      this.grupoService.crearGrupo(this.nombreGrupo, this.usuario).subscribe({
        next: (response) => {
          console.log('Grupo creado:', response);
          const grupoId = response.id; // Asume que la respuesta contiene el id del grupo creado
          this.grupoCreado.emit(); // Emitir evento
          this.router.navigate([`/home/${grupoId}`]); // Navegar al componente home con el id del grupo
        },
        error: (error) => {
          console.error('Error al crear el grupo:', error);
        }
      });
    }
  }

  unirseGrupo() {
    if (this.grupoId && this.usuario) {
      this.grupoService.unirseGrupo(this.grupoId, this.usuario.id).subscribe({
        next: (response) => {
          console.log('Unido al grupo:', response);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error al unirse al grupo:', error);
        }
      });
    }
  }

  navigateToCentral() {
    this.router.navigate(['/menu']);
  }

  navigateToRetroceso() {
    this.router.navigate(['/chat']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  openMenu() {
    this.menu.enable(true, 'mainMenu');
    this.menu.open('mainMenu');
  }
}

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonicModule, MenuController, ModalController } from '@ionic/angular';
import { Usuario } from '../models/usuario';
import { GrupoService } from '../services/grupo-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-participantes',
  templateUrl: './participantes.component.html',
  styleUrls: ['./participantes.component.scss'],
  standalone: true,
  imports: [
    IonicModule, CommonModule, FormsModule
  ]
})
export class ParticipantesComponent implements OnInit, OnDestroy {
  users: Usuario[] = [];
  groupId!: number;
  newUserId: number | undefined;
  removeUserId: number | undefined;
  private routeSub!: Subscription;

  @ViewChild('addUserModal') addUserModal!: ModalController;
  @ViewChild('removeUserModal') removeUserModal!: ModalController;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private menu: MenuController,
    private grupoService: GrupoService
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.groupId = +params['groupId']; // The + sign converts the parameter to a number
      this.getUsers();
      this.refreshModals();
    });
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  getUsers() {
    this.grupoService.getUsuariosByGrupoId(this.groupId).subscribe(
      (data) => {
        console.log('Raw data:', data); // Log the raw data to verify its structure
        this.users = data.map((user: any) => ({ nombre: user.usuario }));
        console.log(this.users); // Log the users to verify data
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  anyadirUsuarioGrupo() {
    if (this.newUserId !== undefined) {
      this.grupoService.anyadirUsuarioGrupo(this.groupId, this.newUserId).subscribe(
        () => {
          this.getUsers(); // Refresh the user list
        },
        (error) => {
          console.error('Error adding user to group', error);
        }
      );
    }
  }

  eliminarUsuarioGrupo() {
    if (this.removeUserId !== undefined) {
      this.grupoService.eliminarUsuarioGrupo(this.groupId, this.removeUserId).subscribe(
        () => {
          this.getUsers(); // Refresh the user list
        },
        (error) => {
          console.error('Error removing user from group', error);
        }
      );
    }
  }

  refreshModals() {
    if (this.addUserModal) {
      this.addUserModal.dismiss();
    }
    if (this.removeUserModal) {
      this.removeUserModal.dismiss();
    }
  }

  navigateToCentral() {
    if (this.groupId !== undefined) {
      this.router.navigate([`/home/${this.groupId}`]);
    } else {
      this.router.navigate(['/home']);
    }
  }

  navigateToRetroceso() {
    this.router.navigate(['/chat']);
  }

  openMenu() {
    this.menu.enable(true, 'mainMenu'); // Enable the menu with ID 'mainMenu'
    this.menu.open('mainMenu'); // Open the menu with ID 'mainMenu'
  }
}

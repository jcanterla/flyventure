import { Component, OnInit } from '@angular/core';
import { MenuController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ActividadVotoDTO } from '../models/ActividadVotosDTO';
import { GrupoService } from '../services/grupo-service.service';
import { Sugerencia } from '../models/sugerencia';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.component.html',
  styleUrls: ['./sugerencias.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SugerenciasComponent implements OnInit {
  sugerencias: ActividadVotoDTO[] = [];
  positiveVotesCount: { [key: number]: number } = {};
  negativeVotesCount: { [key: number]: number } = {};
  groupId!: number;
  newSuggestionImageUrl: string = '';
  newSuggestionPlace: string = '';
  newSuggestionLocation: string = '';
  userHasVoted: { [key: number]: boolean | null } = {};

  constructor(
    private menu: MenuController,
    private router: Router,
    private route: ActivatedRoute,
    private grupoService: GrupoService,

  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const groupIdParam = params['groupId'];
      if (groupIdParam) {
        const parsedGroupId = Number(groupIdParam);
        if (!isNaN(parsedGroupId)) {
          this.groupId = parsedGroupId;
          this.loadSugerencias();
        } else {
          console.error('Invalid group ID: Not a number');
        }
      } else {
        console.error('Invalid group ID: Missing parameter');
      }
    });
  }

  loadSugerencias() {
    this.grupoService.getSugerencias(this.groupId).subscribe((data: ActividadVotoDTO[]) => {
      this.sugerencias = data;
      this.calculateVotes(); // Call calculateVotes after loading suggestions
    });
  }

  calculateVotes() {
    const currentUserId = 3; // Fixed user ID
    this.sugerencias.forEach(actividad => {
      if (actividad.sugerencia.id !== undefined) {
        const positiveVotes = actividad.votos.filter(v => v.voto === true).length;
        const negativeVotes = actividad.votos.filter(v => v.voto === false).length;
        this.positiveVotesCount[actividad.sugerencia.id] = positiveVotes;
        this.negativeVotesCount[actividad.sugerencia.id] = negativeVotes;
        const userVote = actividad.votos.find(v => v.usuarioId === currentUserId);
        this.userHasVoted[actividad.sugerencia.id] = userVote ? userVote.voto : null;

        console.log(`Sugerencia ID: ${actividad.sugerencia.id}, Positive Votes: ${positiveVotes}, Negative Votes: ${negativeVotes}, User Has Voted: ${this.userHasVoted[actividad.sugerencia.id]}`);
      }
    });
  }

  votar(sugerencia: ActividadVotoDTO, positivo: boolean) {
    const currentUserId = 3; // Fixed user ID
    // If the user hasn't voted yet, add a new vote
    this.grupoService.votarActividad(sugerencia.sugerencia.id!, currentUserId, positivo).subscribe(
      (nuevoVoto) => {
        sugerencia.votos.push({ usuarioId: currentUserId, voto: positivo });
        this.userHasVoted[sugerencia.sugerencia.id!] = positivo;
        this.calculateVotes();
      },
      (error) => {
        console.error('Error voting activity', error);
      }
    );
  }

  addSuggestion() {
    const newSuggestion: Sugerencia = {
      id: undefined,
      imagen: this.newSuggestionImageUrl,
      lugar: this.newSuggestionPlace,
      ubicacion: this.newSuggestionLocation,
      grupo: {
        id: this.groupId
      }
    };
    const currentUserId = 3; // Fixed user ID
    console.log('Payload:', newSuggestion); // Log the payload for debugging
    this.grupoService.proponerActividad(currentUserId, newSuggestion).subscribe(
      (sugerencia) => {
        this.sugerencias.push({ sugerencia, votos: [] });
        this.calculateVotes();
      },
      (error) => {
        console.error('Error proposing activity', error);
        if (error.status === 500) {
          console.error('Internal Server Error: Please check the server logs for more details.');
        }
      }
    );
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
    this.menu.enable(true, 'mainMenu');
    this.menu.open('mainMenu');
  }
}

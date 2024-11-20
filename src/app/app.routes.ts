import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home/:groupId',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'menu',
    loadComponent: () => import('./menu/menu.component').then((m) => m.MenuComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.component').then((m) => m.RegistroComponent),
  },
  {
    path: 'notas',
    loadComponent: () => import('./notas/notas.component').then((m) => m.NotasComponent),
  },
  {
    path: 'ubicacion',
    loadComponent: () => import('./ubicacion/ubicacion.component').then((m) => m.UbicacionComponent),
  },
  {
    path: 'sugerencias',
    loadComponent: () => import('./sugerencias/sugerencias.component').then((m) => m.SugerenciasComponent),
  },
  {
    path: 'gastos',
    loadComponent: () => import('./gastos/gastos.component').then((m) => m.GastosComponent),
  },
  {
    path: 'itinerario',
    loadComponent: () => import('./itinerario/itinerario.component').then((m) => m.ItinerarioComponent),
  },
  {
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.component').then((m) => m.PerfilComponent),
  },
  {
    path: 'chat',
    loadComponent: () => import('./chat/chat.component').then((m) => m.ChatComponent),
  },
  {
    path: 'amigos',
    loadComponent: () => import('./amigos/amigos.component').then((m) => m.AmigosComponent),
  },
  {
    path: 'participantes/:groupId',
    loadComponent: () => import('./participantes/participantes.component').then((m) => m.ParticipantesComponent),
  },
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full',
  },

];

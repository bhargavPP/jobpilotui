import { Routes } from '@angular/router';

export const APPLICATION_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./pages/applications/applications.component')
        .then(m => m.ApplicationsComponent),
    title: 'Applications | JobPilot'
  },

  {
    path: ':id',
    loadComponent: () =>
      import('./pages/application-details/application-details.component')
        .then(m => m.ApplicationDetailsComponent),
    title: 'Application Details | JobPilot'
  }

];

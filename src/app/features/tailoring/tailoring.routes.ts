import { Routes } from '@angular/router';

export const TAILORING_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../tailoring/tailoring.component')
        .then(m => m.TailoringComponent),
    title: 'Resume Tailoring | JobPilot'
  }
];

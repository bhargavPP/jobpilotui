import { Routes } from '@angular/router';

import { authGuard } from '../guards/auth.guard';

export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],

    loadComponent: () =>
      import('./shell/shell.component').then(
        m => m.ShellComponent
      ),

    children: [

      {
        path: 'dashboard',
        loadComponent: () =>
          import('../../features/dashboard/pages/dashboard/dashboard.component')
            .then(m => m.DashboardComponent),

        title: 'Dashboard | JobPilot'
      },

      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      }

    ]

  }
];

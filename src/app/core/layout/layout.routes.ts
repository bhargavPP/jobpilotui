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
        path: 'applications',
        loadChildren: () =>
          import('../../features/applications/application.routes')
            .then(m => m.APPLICATION_ROUTES)
      },
      {
        path: 'resume',
        loadChildren: () =>
          import('../../features/resume/resume.routes')
            .then(m => m.RESUME_ROUTES)
      },
      {
        path: 'tailoring',
        loadChildren: () =>
          import('../../features/tailoring/tailoring.routes')
            .then(m => m.TAILORING_ROUTES)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      }

    ]

  }
];

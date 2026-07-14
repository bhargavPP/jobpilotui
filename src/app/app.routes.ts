import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes')
        .then(m => m.AUTH_ROUTES)
  },

  {
    path: '',
    loadChildren: () =>
      import('./core/layout/layout.routes')
        .then(m => m.LAYOUT_ROUTES)
  },

  {
    path: '**',
    redirectTo: 'dashboard'
  }

];

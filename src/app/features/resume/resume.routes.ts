// src/app/features/resume/resume.routes.ts

import { Routes } from '@angular/router';

export const RESUME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../resume/resume.component').then(
        m => m.ResumeComponent
      ),
    title: 'Resume | JobPilot'
  }
];

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
  },
  {
    path: 'preview',
    loadComponent: () =>
      import('./pages/resume-preview/resume-preview.component')
        .then(m => m.ResumePreviewComponent)
  }
];

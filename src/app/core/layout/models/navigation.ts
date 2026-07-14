// src/app/core/layout/models/navigation.ts

import { NavigationItem } from './navigation-item.model';

export const NAVIGATION_ITEMS: NavigationItem[] = [

  {
    label: 'Dashboard',
    icon: 'dashboard',
    route: '/dashboard',
    exact: true
  },

  {
    label: 'Resume',
    icon: 'description',
    route: '/resume'
  },

  {
    label: 'Tailoring',
    icon: 'auto_fix_high',
    route: '/tailoring'
  },

  {
    label: 'Applications',
    icon: 'work',
    route: '/applications'
  },

  {
    label: 'Downloads',
    icon: 'download',
    route: '/downloads'
  },

  {
    label: 'Settings',
    icon: 'settings',
    route: '/settings'
  }

];

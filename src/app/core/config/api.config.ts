import { InjectionToken } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface ApiConfiguration {
  apiUrl: string;
  timeout: number;
}

export const API_CONFIG = new InjectionToken<ApiConfiguration>(
  'API_CONFIG',
  {
    providedIn: 'root',
    factory: () => ({
      apiUrl: environment.apiUrl,
      timeout: 30000
    })
  }
);

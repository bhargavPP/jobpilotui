import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  ApplicationSummary,
  ApplicationDetails,
  UpdateApplicationStatusRequest
} from '../models/application.models';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private readonly http = inject(HttpClient);

  private readonly baseUrl = `${environment.apiUrl}/applications`;

  getApplications(): Observable<ApplicationSummary[]> {
    return this.http.get<ApplicationSummary[]>(this.baseUrl);
  }

  getApplication(id: string): Observable<ApplicationDetails> {
    return this.http.get<ApplicationDetails>(
      `${this.baseUrl}/${id}`);
  }

  updateStatus(
    id: string,
    status: string
  ): Observable<void> {

    const body: UpdateApplicationStatusRequest = {
      status
    };

    return this.http.put<void>(
      `${this.baseUrl}/${id}/status`,
      body);
  }

  deleteApplication(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${id}`);
  }
}

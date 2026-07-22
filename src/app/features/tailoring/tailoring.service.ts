import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { TailorResumeRequest } from './models/tailor-resume-request';
import { TailoredResumeResult } from './models/tailored-resume-result';

@Injectable({
  providedIn: 'root'
})
export class TailoringService {

  private readonly http = inject(HttpClient);

  private readonly tailorUrl =
    `${environment.apiUrl}/tailor`;

  private readonly applicationsUrl =
    `${environment.apiUrl}/applications`;

  tailorResume(
    request: TailorResumeRequest
  ): Observable<TailoredResumeResult> {

    return this.http.post<TailoredResumeResult>(
      this.tailorUrl,
      request
    );
  }

  downloadResume(applicationId: string) {

    return this.http.get(
      `${this.applicationsUrl}/${applicationId}/resume`,
      {
        responseType: 'blob'
      });
  }
}

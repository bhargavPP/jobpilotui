import { inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { ResumeProfile } from './resume.model';
import { ResumeUpsertRequest } from './resume-upsert-request.model';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/resume`;

  /**
   * Returns current user's resume.
   */
  getResume(): Observable<ResumeProfile> {

    return this.http.get<ResumeProfile>(this.apiUrl);

  }

  /**
   * Updates entire resume.
   */
  updateResume(
    request: ResumeUpsertRequest
  ): Observable<ResumeProfile> {

    return this.http.put<ResumeProfile>(
      this.apiUrl,
      request
    );

  }

  /**
   * Upload DOCX resume.
   */
  uploadResume(
    file: File
  ): Observable<HttpEvent<ResumeProfile>> {

    const formData = new FormData();

    formData.append('file', file);

    const request = new HttpRequest(
      'POST',
      `${this.apiUrl}/upload`,
      formData,
      {
        reportProgress: true
      }
    );

    return this.http.request<ResumeProfile>(request);

  }

}

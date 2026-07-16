import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';

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
   * Returns the current user's resume.
   */
  getResume(): Observable<ResumeProfile> {

    return this.http.get<ResumeProfile>(
      this.apiUrl
    );

  }

  /**
   * Saves the resume.
   */
  saveResume(
    request: ResumeUpsertRequest
  ): Observable<ResumeProfile> {

    return this.http.put<ResumeProfile>(
      this.apiUrl,
      request
    );

  }

  /**
   * Uploads and parses a DOCX resume.
   */
  uploadResume(
    file: File
  ): Observable<HttpEvent<ResumeProfile>> {

    const formData = new FormData();

    formData.append(
      'file',
      file,
      file.name
    );

    return this.http.post<ResumeProfile>(
      `${this.apiUrl}/upload`,
      formData,
      {
        observe: 'events',
        reportProgress: true
      }
    );

  }

}

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ResumeService } from './resume.service';
import { ResumeProfile } from './resume.model';
import { UploadDropzoneComponent } from './components/upload-dropzone/upload-dropzone.component';
@Component({
  selector: 'app-resume',

  standalone: true,

  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    UploadDropzoneComponent
  ],

  templateUrl: './resume.component.html',

  styleUrls: ['./resume.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResumeComponent {

  private readonly resumeService = inject(ResumeService);

  readonly loading = signal(true);

  readonly resume = signal<ResumeProfile | null>(null);

  readonly notFound = signal(false);

  readonly error = signal<string | null>(null);

  constructor() {

    this.loadResume();

  }

  loadResume(): void {

    this.loading.set(true);

    this.notFound.set(false);

    this.error.set(null);

    this.resumeService
      .getResume()
      .subscribe({

        next: resume => {

          this.resume.set(resume);

          this.loading.set(false);

        },

        error: (error: HttpErrorResponse) => {

          this.loading.set(false);

          if (error.status === 404) {

            this.notFound.set(true);

            return;

          }

          this.error.set(
            error.error ?? 'Unable to load resume.'
          );

        }

      });

  }

  onResumeUploaded(_: ResumeProfile): void {

    // Always reload from the API so the UI reflects
    // the server's latest version.

    this.loadResume();

  }

}

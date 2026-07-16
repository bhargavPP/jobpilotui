import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  HttpEvent,
  HttpEventType
} from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ResumeProfile } from '../../resume.model';
import { ResumeService } from '../../resume.service';

@Component({
  selector: 'app-upload-dropzone',

  standalone: true,

  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule
  ],

  templateUrl: './upload-dropzone.component.html',

  styleUrls: ['./upload-dropzone.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadDropzoneComponent {

  private readonly resumeService = inject(ResumeService);

  private readonly snackBar = inject(MatSnackBar);

  /**
   * Emits after a successful upload.
   */
  readonly uploaded = output<ResumeProfile>();

  readonly dragging = signal(false);

  readonly uploading = signal(false);

  readonly progress = signal(0);

  /**
   * Supported extensions.
   */
  readonly accept = '.docx';

  onDragOver(event: DragEvent): void {

    event.preventDefault();

    this.dragging.set(true);

  }

  onDragLeave(event: DragEvent): void {

    event.preventDefault();

    this.dragging.set(false);

  }

  onDrop(event: DragEvent): void {

    event.preventDefault();

    this.dragging.set(false);

    const file = event.dataTransfer?.files?.[0];

    if (!file) {

      return;

    }

    this.upload(file);

  }

  browse(event: Event): void {

    const input = event.target as HTMLInputElement;

    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.upload(file);

    // Allow selecting the same file again.
    input.value = '';

  }

  private upload(file: File): void {

    if (!file.name.toLowerCase().endsWith('.docx')) {

      this.snackBar.open(
        'Only DOCX files are supported.',
        'Close',
        {
          duration: 3000
        }
      );

      return;

    }

    this.uploading.set(true);

    this.progress.set(0);

    this.resumeService
      .uploadResume(file)
      .subscribe({

        next: (event: HttpEvent<ResumeProfile>) => {

          switch (event.type) {

            case HttpEventType.UploadProgress:

              if (event.total) {

                this.progress.set(
                  Math.round(
                    event.loaded / event.total * 100
                  )
                );

              }

              break;

            case HttpEventType.Response:

              this.uploading.set(false);

              this.progress.set(100);

              this.uploaded.emit(event.body!);

              this.snackBar.open(
                'Resume uploaded successfully.',
                'Close',
                {
                  duration: 3000
                }
              );

              break;

          }

        },

        error: (error) => {

          this.uploading.set(false);

          this.progress.set(0);

          this.snackBar.open(
            error?.error ??
            'Resume upload failed.',
            'Close',
            {
              duration: 5000
            }
          );

        }

      });

  }

}

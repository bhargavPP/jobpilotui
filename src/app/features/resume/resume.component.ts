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
import { ResumeUpsertRequest } from './resume-upsert-request.model';
import { ResumeService } from './resume.service';
import { ResumeProfile } from './resume.model';
import { UploadDropzoneComponent } from './components/upload-dropzone/upload-dropzone.component';
import { SummaryEditorComponent } from './components/summary-editor/summary-editor.component';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ExperienceEntry } from './resume.model';

import { ExperienceDialogComponent } from './components/experience-dialog/experience-dialog.component';

import { ExperienceListComponent } from './components/experience-list/experience-list.component';

import { EducationEntry } from './resume.model';

import { EducationListComponent } from './components/Education/education-list/education-list.component';

import { EducationDialogComponent } from './components/Education/education-dialog/education-dialog.component';
import { SkillsEditorComponent } from './components/skills-editor/skills-editor.component';
import { SkillSet } from './resume.model';

import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { DeleteConfirmDialogComponent } from '../../shared/delete-confirm-dialog/delete-confirm-dialog.component';
@Component({
  selector: 'app-resume',

  standalone: true,

  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    UploadDropzoneComponent,
    SummaryEditorComponent,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    UploadDropzoneComponent,
    SummaryEditorComponent,
    ExperienceListComponent,
    EducationListComponent,
    SkillsEditorComponent
  ],

  templateUrl: './resume.component.html',

  styleUrls: ['./resume.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResumeComponent {
  private readonly router = inject(Router);
  private readonly resumeService = inject(ResumeService);

  readonly loading = signal(true);

  readonly resume = signal<ResumeProfile | null>(null);

  readonly notFound = signal(false);

  readonly error = signal<string | null>(null);
  private readonly dialog = inject(MatDialog);
  constructor() {

    this.loadResume();

  }

  loadResume(): void {

    this.loading.set(true);

    this.error.set(null);

    this.notFound.set(false);

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

          this.error.set('Unable to load resume.');

        }

      });

  }

  onResumeUploaded(_: ResumeProfile): void {

    this.loadResume();

  }

  saveSummary(summary: string): void {

    const resume = this.resume();

    if (!resume) {

      return;

    }

    const request: ResumeUpsertRequest = {

      summary,

      experience: resume.experience,

      education: resume.education,

      skills: resume.skills

    };

    this.resumeService
      .updateResume(request)
      .subscribe({

        next: updated => {

          this.resume.set(updated);

        },

        error: error => {

          console.error(error);

        }

      });

  }


  addExperience(): void {

    this.dialog.open(ExperienceDialogComponent, {
      width: '800px',
      data: null
    })
      .afterClosed()
      .subscribe(result => {

        if (!result) {
          return;
        }

        this.resume.update(current => {

          if (!current) {
            return current;
          }

          return {
            ...current,
            experience: [
              ...current.experience,
              result
            ]
          };

        });

        this.saveResume();

      });

  }
   saveResume(): void {

    const resume = this.resume();

    if (!resume) {

      return;

    }

    this.resumeService
      .updateResume({

        summary: resume.summary,

        experience: resume.experience,

        education: resume.education,

        skills: resume.skills

      })
      .subscribe({

        next: updated => {

          this.resume.set(updated);

        },

        error: error => {

          console.error(error);

        }

      });

  }
  deleteExperience(experience: ExperienceEntry): void {

    this.resume.update(current => {

      if (!current) {
        return current;
      }

      return {
        ...current,
        experience: current.experience.filter(
          item => item.id !== experience.id
        )
      };

    });

    this.saveResume();

  }
  editExperience(experience: ExperienceEntry): void {

    this.dialog.open(ExperienceDialogComponent, {
      width: '800px',
      data: structuredClone(experience)
    })
      .afterClosed()
      .subscribe(result => {

        if (!result) {
          return;
        }

        this.resume.update(current => {

          if (!current) {
            return current;
          }

          return {
            ...current,
            experience: current.experience.map(item =>
              item.id === result.id ? result : item
            )
          };

        });

        this.saveResume();

      });

  }

  addEducation(): void {

    this.dialog.open(EducationDialogComponent, {

      width: '600px',

      maxWidth: '95vw',

      data: null

    })
      .afterClosed()
      .subscribe(result => {

        if (!result) {

          return;

        }

        this.resume.update(current => {

          if (!current) {

            return current;

          }

          return {

            ...current,

            education: [

              ...current.education,

              result

            ]

          };

        });

        this.saveResume();

      });

  }

  editEducation(
    education: EducationEntry
  ): void {

    this.dialog.open(EducationDialogComponent, {

      width: '600px',

      maxWidth: '95vw',

      data: structuredClone(education)

    })
      .afterClosed()
      .subscribe(result => {

        if (!result) {

          return;

        }

        this.resume.update(current => {

          if (!current) {

            return current;

          }

          return {

            ...current,

            education: current.education.map(item =>

              item.institution === education.institution &&
                item.degree === education.degree
                ? result
                : item

            )

          };

        });

        this.saveResume();

      });

  }

  deleteEducation(
    education: EducationEntry
  ): void {

    this.resume.update(current => {

      if (!current) {

        return current;

      }

      return {

        ...current,

        education: current.education.filter(item =>

          !(

            item.institution === education.institution &&
            item.degree === education.degree

          )

        )

      };

    });

    this.saveResume();

  }

  saveSkills(skills: SkillSet): void {

    this.resume.update(current => {

      if (!current) {

        return current;

      }

      return {

        ...current,

        skills

      };

    });

    this.saveResume();

  }

  goToPreview(): void {

    this.router.navigate(['/resume/preview']);

  }

  deleteResume(): void {

    this.dialog.open(DeleteConfirmDialogComponent)
      .afterClosed()
      .subscribe(result => {

        if (!result) {
          return;
        }

        this.resumeService.deleteResume().subscribe({

          next: () => {

            this.resume.set(null);

            this.notFound.set(true);

          },

          error: () => {

            alert('Unable to delete resume.');

          }

        });

      });

  }
}

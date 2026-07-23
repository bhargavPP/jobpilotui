import { Component, OnDestroy ,ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

import { TailoringService } from './tailoring.service';
import { TailoredResumeResult } from './models/tailored-resume-result';

import { TailoringFormComponent } from './components/tailoring-form/tailoring-form.component';
import { ScoreCardComponent } from './components/score-card/score-card.component';
import { SummaryCardComponent } from './components/summary-card/summary-card.component';
import { ResumePreviewComponent } from './components/resume-preview/resume-preview.component';
import { SkillsCardComponent } from './components/skills-card/skills-card.component';
import { RecommendationsCardComponent } from './components/recommendations-card/recommendations-card.component';
import { CoverLetterCardComponent } from './components/cover-letter-card/cover-letter-card.component';

import { saveAs } from 'file-saver';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-tailoring',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TailoringFormComponent,
    ScoreCardComponent,
    SummaryCardComponent,
    ResumePreviewComponent,
    SkillsCardComponent,
    RecommendationsCardComponent,
    CoverLetterCardComponent,
    MatButtonModule,
    MatIconModule
    
  ],
  templateUrl: './tailoring.component.html',
  styleUrls: ['./tailoring.component.scss']
})
export class TailoringComponent implements OnDestroy {

  loading = false;

  companyName = '';
  jobTitle = '';
  jobUrl = '';
  jobDescription = '';

  result: TailoredResumeResult | null = null;

  progress = 0;

  currentStep = 0;

  loadingSteps = [
    'Reading your resume',
    'Analyzing job description',
    'Extracting ATS keywords',
    'Optimizing professional summary',
    'Rewriting work experience',
    'Generating cover letter',
    'Finalizing'
  ];

  loadingMessage = this.loadingSteps[0];

  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(
    private tailoringService: TailoringService,
    private cdr: ChangeDetectorRef
  ) { }

  tailorResume(): void {

    if (this.loading) {
      return;
    }

    if (!this.jobDescription.trim()) {
      return;
    }

    this.loading = true;
    this.result = null;

    this.progress = 0;
    this.currentStep = 0;
    this.loadingMessage = this.loadingSteps[0];
     
    this.startAnimation();

    this.tailoringService
      .tailorResume({
        companyName: this.companyName,
        jobTitle: this.jobTitle,
        jobUrl: this.jobUrl,
        jobDescription: this.jobDescription
      })
      .pipe(
        finalize(() => {
           
          this.stopAnimation();

          this.progress = 100;

          this.currentStep =
            this.loadingSteps.length - 1;

          this.loadingMessage = 'Completed';

          this.loading = false;
          this.cdr.markForCheck();  
        })
      )
      .subscribe({

        next: result => {

          this.result = result;
          this.cdr.markForCheck(); 
        },

        error: err => {

          console.error(err);

        }

      });

  }

  private startAnimation(): void {

    this.stopAnimation();

    this.timer = setInterval(() => {

      if (this.progress < 92) {

        this.progress += 4;

      }
 
      if (
        this.currentStep <
        this.loadingSteps.length - 1
      ) {

        this.currentStep++;

        this.loadingMessage =
          this.loadingSteps[this.currentStep];

      }
      this.cdr.markForCheck(); 
    }, 700);

  }

  private stopAnimation(): void {

    if (this.timer) {

      clearInterval(this.timer);

      this.timer = null;

    }

  }

  ngOnDestroy(): void {

    this.stopAnimation();

  }
  downloadResume(): void {

    if (!this.result?.applicationId) {
      return;
    }

    this.tailoringService
      .downloadResume(this.result.applicationId)
      .subscribe({

        next: blob => {

          const company =
            this.result?.companyName ??
            'Tailored_Resume';

          const fileName =
            `${company.replace(/\s+/g, '_')}_Resume.docx`;

          saveAs(blob, fileName);
        },

        error: err => {

          console.error('Resume download failed.', err);

          alert('Unable to download resume.');
        }
      });

  }
}

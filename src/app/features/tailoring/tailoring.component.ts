import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TailoringService } from './tailoring.service';
import { TailoredResumeResult } from './models/tailored-resume-result';

@Component({
  selector: 'app-tailoring',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './tailoring.component.html',
  styleUrls: ['./tailoring.component.scss']
})
export class TailoringComponent {

  loadingSteps = [
    'Reading your resume...',
    'Analyzing job description...',
    'Extracting ATS keywords...',
    'Optimizing professional summary...',
    'Rewriting experience...',
    'Generating cover letter...',
    'Finalizing results...'
  ];

  currentStep = 0;

  companyName = '';
  jobTitle = '';
  jobUrl = '';
  jobDescription = '';

  loading = false;

  // Allow null so we can reset the result before a new request
  result: TailoredResumeResult | null = null;

  constructor(
    private tailoringService: TailoringService
  ) { }

  tailorResume(): void {

    if (!this.jobDescription.trim()) {
      return;
    }

    this.loading = true;
    this.result = null;
    this.currentStep = 0;

    const interval = setInterval(() => {

      if (this.currentStep < this.loadingSteps.length - 1) {
        this.currentStep++;
      }

    }, 900);

    this.tailoringService.tailorResume({

      companyName: this.companyName,
      jobTitle: this.jobTitle,
      jobUrl: this.jobUrl,
      jobDescription: this.jobDescription

    }).subscribe({

      next: (res: TailoredResumeResult) => {

        clearInterval(interval);

        this.result = res;
        this.loading = false;

      },

      error: (err) => {

        clearInterval(interval);

        console.error('Tailoring failed:', err);

        this.loading = false;

      }

    });

  }

}

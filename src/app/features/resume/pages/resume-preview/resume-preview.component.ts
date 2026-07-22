import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ResumeService } from '../../resume.service';
import { ResumeProfile } from '../../resume.model';

@Component({
  selector: 'app-resume-preview',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './resume-preview.component.html',
  styleUrls: ['./resume-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResumePreviewComponent implements OnInit {

  private readonly resumeService = inject(ResumeService);

  readonly loading = signal(true);

  readonly resume = signal<ResumeProfile | null>(null);

  readonly error = signal('');

  ngOnInit(): void {
    
    this.resumeService.getResume().subscribe({

      next: resume => {

        this.resume.set(resume);

        this.loading.set(false);

      },

      error: () => {

        this.error.set('Unable to load resume.');

        this.loading.set(false);

      }

    });

  }

  getDateRange(
    startDate: string,
    endDate: string | null
  ): string {

    return `${this.formatMonth(startDate)} - ${endDate ? this.formatMonth(endDate) : 'Present'}`;

  }

  private formatMonth(date: string): string {

    const [year, month] = date.split('-');

    const monthName = new Date(
      Number(year),
      Number(month) - 1,
      1
    ).toLocaleString('en-US', {
      month: 'short'
    });

    return `${monthName} ${year}`;

  }
  get orderedCustomSections() {
    return [...(this.resume()?.customSections ?? [])]
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }
  hasSkills(): boolean {
    const skills = this.resume()?.skills;

    if (!skills) {
      return false;
    }

    return [
      skills.languages,
      skills.frameworks,
      skills.cloud,
      skills.devOps,
      skills.databases
    ].some(s => s?.length > 0);
  }
}

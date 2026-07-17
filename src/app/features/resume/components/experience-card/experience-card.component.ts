import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { ExperienceEntry } from '../../resume.model';

@Component({
  selector: 'app-experience-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceCardComponent {

  readonly experience = input.required<ExperienceEntry>();

  readonly edit = output<ExperienceEntry>();

  readonly delete = output<ExperienceEntry>();

  onEdit(): void {

    this.edit.emit(this.experience());

  }

  onDelete(): void {

    this.delete.emit(this.experience());

  }

  private formatMonthYear(
    date: string | null
  ): string {

    if (!date) {

      return 'Present';

    }

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

  getDateRange(): string {

    const experience = this.experience();

    const start = this.formatMonthYear(
      experience.startDate
    );

    const end = experience.endDate
      ? this.formatMonthYear(experience.endDate)
      : 'Present';

    return `${start} - ${end}`;

  }

}

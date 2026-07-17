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

import { EducationEntry } from '../../../resume.model';

@Component({
  selector: 'app-education-card',

  standalone: true,

  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],

  templateUrl: './education-card.component.html',

  styleUrls: ['./education-card.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationCardComponent {

  readonly education = input.required<EducationEntry>();

  readonly edit = output<EducationEntry>();

  readonly delete = output<EducationEntry>();

  onEdit(): void {

    this.edit.emit(this.education());

  }

  onDelete(): void {

    this.delete.emit(this.education());

  }

  getGraduationDate(): string {

    const value = this.education().graduationDate;

    if (!value) {

      return 'Present';

    }

    const [year, month] = value.split('-');

    const monthName = new Date(
      Number(year),
      Number(month) - 1,
      1
    ).toLocaleString('en-US', {
      month: 'short'
    });

    return `${monthName} ${year}`;

  }

}

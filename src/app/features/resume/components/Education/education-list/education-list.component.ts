import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { EducationEntry } from '../../../resume.model';

import { EducationCardComponent } from '../education-card/education-card.component';

@Component({
  selector: 'app-education-list',

  standalone: true,

  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    EducationCardComponent
  ],

  templateUrl: './education-list.component.html',

  styleUrls: ['./education-list.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationListComponent {

  readonly education = input.required<EducationEntry[]>();

  readonly add = output<void>();

  readonly edit = output<EducationEntry>();

  readonly delete = output<EducationEntry>();

  trackByEducation(
    index: number,
    education: EducationEntry
  ): string {

    return `${education.institution}-${education.degree}-${index}`;

  }

  onAdd(): void {

    this.add.emit();

  }

  onEdit(
    education: EducationEntry
  ): void {

    this.edit.emit(education);

  }

  onDelete(
    education: EducationEntry
  ): void {

    this.delete.emit(education);

  }

}

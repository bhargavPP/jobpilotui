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

import { ExperienceEntry } from '../../resume.model';
import { ExperienceCardComponent } from '../experience-card/experience-card.component';

@Component({
  selector: 'app-experience-list',

  standalone: true,

  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ExperienceCardComponent
  ],

  templateUrl: './experience-list.component.html',

  styleUrls: ['./experience-list.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceListComponent {

  readonly experiences = input.required<ExperienceEntry[]>();

  readonly add = output<void>();

  readonly edit = output<ExperienceEntry>();

  readonly delete = output<ExperienceEntry>();

  trackByExperience(
    index: number,
    experience: ExperienceEntry 
  ): string {

    return experience.id ?? index.toString();

  }

  onAdd(): void {

    this.add.emit();

  }

  onEdit(experience: ExperienceEntry): void {

    this.edit.emit(experience);

  }

  onDelete(experience: ExperienceEntry): void {

    this.delete.emit(experience);

  }

}

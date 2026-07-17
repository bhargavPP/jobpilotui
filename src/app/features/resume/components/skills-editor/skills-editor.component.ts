import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { SkillSet } from '../../resume.model';

@Component({
  selector: 'app-skills-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './skills-editor.component.html',
  styleUrls: ['./skills-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsEditorComponent {

  readonly skills = input.required<SkillSet>();

  readonly save = output<SkillSet>();

  language = '';
  framework = '';
  cloud = '';
  devOps = '';
  database = '';

  addSkill(
    category: keyof SkillSet,
    value: string
  ): void {

    value = value.trim();

    if (!value) {
      return;
    }

    const updated: SkillSet = structuredClone(this.skills());

    updated[category].push(value);

    this.save.emit(updated);

    this.clear(category);

  }

  removeSkill(
    category: keyof SkillSet,
    value: string
  ): void {

    const updated: SkillSet = structuredClone(this.skills());

    updated[category] =
      updated[category].filter(x => x !== value);

    this.save.emit(updated);

  }

  private clear(category: keyof SkillSet): void {

    switch (category) {

      case 'languages':
        this.language = '';
        break;

      case 'frameworks':
        this.framework = '';
        break;

      case 'cloud':
        this.cloud = '';
        break;

      case 'devOps':
        this.devOps = '';
        break;

      case 'databases':
        this.database = '';
        break;

    }

  }

}

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

import { SkillCategory } from '../../resume.model';

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

  readonly skillCategories = input.required<SkillCategory[]>();

  readonly save = output<SkillCategory[]>();

  addCategory(): void {

    const updated = structuredClone(this.skillCategories());

    updated.push({
      id: crypto.randomUUID(),
      name: '',
      skills: []
    });

    this.save.emit(updated);

  }

  removeCategory(id: string): void {

    const updated = this.skillCategories().filter(c => c.id !== id);

    this.save.emit(updated);

  }

  addSkill(categoryId: string, value: string): void {

    value = value.trim();

    if (!value) {
      return;
    }

    const updated = structuredClone(this.skillCategories());

    const category = updated.find(c => c.id === categoryId);

    if (!category) {
      return;
    }

    category.skills.push(value);

    this.save.emit(updated);

  }

  removeSkill(categoryId: string, value: string): void {

    const updated = structuredClone(this.skillCategories());

    const category = updated.find(c => c.id === categoryId);

    if (!category) {
      return;
    }

    category.skills = category.skills.filter(s => s !== value);

    this.save.emit(updated);

  }

  emitChanges(): void {

    this.save.emit(structuredClone(this.skillCategories()));

  }

}

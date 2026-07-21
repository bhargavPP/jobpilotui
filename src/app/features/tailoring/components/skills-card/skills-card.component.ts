import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillSet } from '../../models/skill-set';

@Component({
  selector: 'app-skills-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills-card.component.html',
  styleUrls: ['./skills-card.component.scss']
})
export class SkillsCardComponent {

  @Input({ required: true })
  skills!: SkillSet;

  @Input()
  requiredSkills: string[] = [];

  @Input()
  niceToHave: string[] = [];

  @Input()
  keywords: string[] = [];

  @Input()
  missingSkills: string[] = [];

}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TailoredResumeResult } from '../../models/tailored-resume-result';

@Component({
  selector: 'app-resume-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume-preview.component.html',
  styleUrls: ['./resume-preview.component.scss']
})
export class ResumePreviewComponent {

  @Input({ required: true })
  result!: TailoredResumeResult;

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tailoring-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './tailoring-form.component.html',
  styleUrls: ['./tailoring-form.component.scss']
})
export class TailoringFormComponent {
  @Input() companyName = '';
  @Input() jobTitle = '';
  @Input() jobUrl = '';
  @Input() jobDescription = '';
  @Input() loading = false;

  @Output() companyNameChange = new EventEmitter<string>();
  @Output() jobTitleChange = new EventEmitter<string>();
  @Output() jobUrlChange = new EventEmitter<string>();
  @Output() jobDescriptionChange = new EventEmitter<string>();

  @Output() tailor = new EventEmitter<void>();
}

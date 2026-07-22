import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersonalInfo } from '../../resume.model';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-contact-editor',
  standalone: true,
  imports: [FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './contact-editor.component.html',
  styleUrl: './contact-editor.component.scss'
})
export class ContactEditorComponent {
  contact = input.required<PersonalInfo>();
}

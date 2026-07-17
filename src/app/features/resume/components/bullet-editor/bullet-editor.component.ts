import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-bullet-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './bullet-editor.component.html',
  styleUrls: ['./bullet-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BulletEditorComponent {

  readonly index = input.required<number>();

  readonly control = input.required<any>();

  readonly remove = output<number>();

  removeBullet(): void {

    this.remove.emit(this.index());

  }

}

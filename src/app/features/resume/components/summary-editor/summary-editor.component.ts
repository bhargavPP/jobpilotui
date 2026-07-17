import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-summary-editor',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],

  templateUrl: './summary-editor.component.html',

  styleUrls: ['./summary-editor.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryEditorComponent {

  private readonly fb = inject(FormBuilder);

  private readonly destroyRef = inject(DestroyRef);

  readonly summary = input.required<string>();

  readonly save = output<string>();

  readonly form = this.fb.nonNullable.group({

    summary: [
      '',
      [
        Validators.required,
        Validators.maxLength(2000)
      ]
    ]

  });

  constructor() {

    effect(() => {

      this.form.patchValue(
        {
          summary: this.summary()
        },
        {
          emitEvent: false
        }
      );

    });

    this.form.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();

  }

  saveSummary(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    this.save.emit(
      this.form.getRawValue().summary
    );

  }

}

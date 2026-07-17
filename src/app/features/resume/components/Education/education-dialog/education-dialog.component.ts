import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { EducationEntry } from '../../../resume.model';

@Component({
  selector: 'app-education-dialog',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],

  templateUrl: './education-dialog.component.html',

  styleUrls: ['./education-dialog.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationDialogComponent {

  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({

    institution: [
      '',
      Validators.required
    ],

    degree: [
      '',
      Validators.required
    ],

    graduationDate: [
      ''
    ]

  });

  constructor(
    private dialogRef: MatDialogRef<EducationDialogComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: EducationEntry | null
  ) {

    if (data) {

      this.form.patchValue({

        institution: data.institution,

        degree: data.degree,

        graduationDate: this.toDateInput(
          data.graduationDate
        )

      });

    }

  }

  private toDateInput(
    value: string | null
  ): string {

    return value
      ? value.substring(0, 10)
      : '';

  }

  save(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    this.dialogRef.close(

      this.form.getRawValue()

    );

  }

  cancel(): void {

    this.dialogRef.close();

  }

}

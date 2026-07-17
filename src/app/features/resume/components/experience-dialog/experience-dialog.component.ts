import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormArray,
  FormBuilder,
  FormGroup,
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
import { MatIconModule } from '@angular/material/icon';

import {
  Bullet,
  ExperienceEntry
} from '../../resume.model';
import { BulletEditorComponent } from '../bullet-editor/bullet-editor.component';
@Component({
  selector: 'app-experience-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    BulletEditorComponent
  ],
  templateUrl: './experience-dialog.component.html',
  styleUrls: ['./experience-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceDialogComponent {

  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.group({

    company: ['', Validators.required],

    title: ['', Validators.required],

    startDate: ['', Validators.required],

    endDate: [''],

    bullets: this.fb.array<FormGroup>([])

  });

  constructor(
    private dialogRef: MatDialogRef<ExperienceDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: ExperienceEntry | null
  ) {

    if (data) {

      this.form.patchValue({

        company: data.company,

        title: data.title,

        startDate: this.toDateInput(data.startDate),

        endDate: this.toDateInput(data.endDate)

      });

      data.bullets.forEach(b => {

        this.bullets.push(

          this.createBulletGroup(b)

        );

      });

    }
    else {

      this.addBullet();

    }

  }

  get bullets(): FormArray<FormGroup> {

    return this.form.controls.bullets;

  }

  private createBulletGroup(
    bullet?: Bullet
  ): FormGroup {

    return this.fb.group({

      id: [bullet?.id ?? crypto.randomUUID()],

      text: [
        bullet?.text ?? '',
        Validators.required
      ],

      tags: [bullet?.tags ?? []]

    });

  }

  private toDateInput(
    value: string | null
  ): string {

    return value
      ? value.substring(0, 10)
      : '';

  }

  addBullet(): void {

    this.bullets.push(

      this.createBulletGroup()

    );

  }

  removeBullet(index: number): void {

    this.bullets.removeAt(index);

  }

  save(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    const value = this.form.getRawValue();

    const result: ExperienceEntry = {

      id: this.data?.id ?? crypto.randomUUID(),

      company: value.company!,

      title: value.title!,

      startDate: value.startDate!,

      endDate: value.endDate || null,

      bullets: (value.bullets as Bullet[]).map(b => ({

        id: b.id,

        text: b.text,

        tags: b.tags

      }))

    };

    this.dialogRef.close(result);

  }

  cancel(): void {

    this.dialogRef.close();

  }

}

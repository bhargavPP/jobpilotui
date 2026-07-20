import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-confirm-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './delete-confirm-dialog.component.html'
})
export class DeleteConfirmDialogComponent {

  readonly dialogRef = inject(MatDialogRef<DeleteConfirmDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

}

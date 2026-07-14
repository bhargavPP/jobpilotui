import { Injectable, inject } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly snackBar =
    inject(MatSnackBar);

  success(message: string): void {

    this.open(message);
  }

  error(message: string): void {

    this.open(message);
  }

  warning(message: string): void {

    this.open(message);
  }

  info(message: string): void {

    this.open(message);
  }

  private open(message: string): void {

    this.snackBar.open(
      message,
      'Close',
      {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      }
    );
  }
}

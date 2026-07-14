import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  private readonly authService = inject(AuthService);

  private readonly router = inject(Router);

  /**
   * Emits when the hamburger menu is clicked.
   */
  readonly menuClick = output<void>();

  /**
   * Application title.
   */
  readonly appName = 'JobPilot';

  /**
   * Opens/closes the mobile sidenav.
   */
  openMenu(): void {
    this.menuClick.emit();
  }

  /**
   * Logs out the current user.
   */
  logout(): void {

    this.authService.logout();

    this.router.navigate(['/auth/login']);

  }

}

import {
  ChangeDetectionStrategy,
  Component,
  output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { NAVIGATION_ITEMS } from '../models/navigation';

@Component({
  selector: 'app-sidebar',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule
  ],

  templateUrl: './sidebar.component.html',

  styleUrls: ['./sidebar.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {

  /**
   * Emitted after a navigation item is clicked.
   * Used by the shell to close the sidenav on mobile.
   */
  readonly navigate = output<void>();

  readonly navigationItems = NAVIGATION_ITEMS;

  onNavigate(): void {

    this.navigate.emit();

  }

}

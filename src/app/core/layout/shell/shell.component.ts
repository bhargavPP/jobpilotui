import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  computed,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

import {
  MatSidenav,
  MatSidenavModule
} from '@angular/material/sidenav';

import { MatToolbarModule } from '@angular/material/toolbar';

import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    HeaderComponent,
    SidebarComponent
  ],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent {

  private readonly breakpointObserver = inject(BreakpointObserver);

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  /**
   * True when viewport width is 768px or less.
   */
  readonly mobile = toSignal(
    this.breakpointObserver
      .observe('(max-width: 768px)')
      .pipe(
        map(result => result.matches)
      ),
    {
      initialValue: false
    }
  );

  /**
   * Sidenav mode based on screen size.
   */
  readonly sidenavMode = computed<'side' | 'over'>(() =>
    this.mobile() ? 'over' : 'side'
  );

  /**
   * Keep sidenav open on desktop.
   */
  readonly sidenavOpened = computed(() =>
    !this.mobile()
  );

  /**
   * Toggle sidenav on mobile.
   */
  toggleSidebar(): void {

    if (this.mobile()) {
      this.sidenav.toggle();
    }

  }

  /**
   * Close sidenav after navigation on mobile.
   */
  closeSidebar(): void {

    if (this.mobile()) {
      this.sidenav.close();
    }

  }

}

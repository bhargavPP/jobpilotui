import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  computed,
  inject,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { RouterOutlet } from '@angular/router';

import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
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

  private readonly breakpointObserver =
    inject(BreakpointObserver);

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  /**
   * Indicates whether the viewport is mobile-sized.
   */
  readonly mobile = signal(false);

  /**
   * Sidenav mode based on viewport size.
   */
  readonly sidenavMode = computed<'side' | 'over'>(() =>
    this.mobile() ? 'over' : 'side'
  );

  /**
   * Whether the sidenav should be opened.
   */
  readonly sidenavOpened = computed(() =>
    !this.mobile()
  );

  constructor() {

    this.breakpointObserver
      .observe('(max-width: 768px)')
      .pipe(map(result => result.matches)),
    {
      initialValue: false
    }

  }
 
  /**
   * Triggered from the header menu button.
   */
  toggleSidebar(): void {

    if (this.mobile()) {

      this.sidenav.toggle();

    }

  }

  /**
   * Closes the sidenav after navigation on mobile.
   */
  closeSidebar(): void {

    if (this.mobile()) {

      this.sidenav.close();

    }

  }

}

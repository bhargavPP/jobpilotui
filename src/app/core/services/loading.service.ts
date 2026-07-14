import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  /**
   * Active HTTP request count.
   */
  private readonly requestCount = signal(0);

  /**
   * Global loading state.
   */
  readonly isLoading = computed(() => this.requestCount() > 0);

  /**
   * Called before an HTTP request starts.
   */
  show(): void {

    this.requestCount.update(value => value + 1);

  }

  /**
   * Called when an HTTP request completes.
   */
  hide(): void {

    this.requestCount.update(value => Math.max(0, value - 1));

  }

  /**
   * Resets loading state.
   */
  reset(): void {

    this.requestCount.set(0);

  }
}

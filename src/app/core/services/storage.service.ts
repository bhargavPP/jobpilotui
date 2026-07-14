import { Injectable } from '@angular/core';

export type StorageType = 'local' | 'session';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  /**
   * Stores a value.
   */
  set<T>(
    key: string,
    value: T,
    storage: StorageType = 'local'
  ): void {

    const target = this.getStorage(storage);

    target.setItem(
      key,
      JSON.stringify(value)
    );
  }

  /**
   * Reads a value.
   */
  get<T>(
    key: string,
    storage: StorageType = 'local'
  ): T | null {

    const target = this.getStorage(storage);

    const value = target.getItem(key);

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value) as T;
    }
    catch {
      return null;
    }
  }

  /**
   * Returns true if the key exists.
   */
  has(
    key: string,
    storage: StorageType = 'local'
  ): boolean {

    const target = this.getStorage(storage);

    return target.getItem(key) !== null;
  }

  /**
   * Removes a single item.
   */
  remove(
    key: string,
    storage: StorageType = 'local'
  ): void {

    const target = this.getStorage(storage);

    target.removeItem(key);
  }

  /**
   * Clears either localStorage or sessionStorage.
   */
  clear(
    storage: StorageType = 'local'
  ): void {

    const target = this.getStorage(storage);

    target.clear();
  }

  /**
   * Clears both localStorage and sessionStorage.
   */
  clearAll(): void {

    localStorage.clear();
    sessionStorage.clear();
  }

  /**
   * Returns the requested storage implementation.
   */
  private getStorage(
    storage: StorageType
  ): Storage {

    return storage === 'local'
      ? localStorage
      : sessionStorage;
  }

}

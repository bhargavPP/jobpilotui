// src/app/core/layout/models/navigation-item.model.ts

export interface NavigationItem {

  /**
   * Display text.
   */
  label: string;

  /**
   * Material icon name.
   */
  icon: string;

  /**
   * Router link.
   */
  route: string;

  /**
   * Whether the item should match child routes.
   */
  exact?: boolean;

  /**
   * Children for nested menus.
   */
  children?: NavigationItem[];

}

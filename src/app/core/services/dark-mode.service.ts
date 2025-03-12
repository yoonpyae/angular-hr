import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private themeKey = 'theme-preference'; // Local Storage Key

  constructor() {
    this.applyTheme();
  }

  // Detect system preference
  getSystemPreference(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // Get user preference
  getUserPreference(): boolean | null {
    const storedTheme = localStorage.getItem(this.themeKey);
    return storedTheme ? storedTheme === 'dark' : null;
  }

  // Apply the theme
  applyTheme(): void {
    const userPref = this.getUserPreference();
    const isDarkMode =
      userPref !== null ? userPref : this.getSystemPreference();

    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }

  // Toggle dark mode
  toggleDarkMode(): void {
    const isDark = document.documentElement.classList.toggle('dark-mode');
    localStorage.setItem(this.themeKey, isDark ? 'dark' : 'light');
  }
}

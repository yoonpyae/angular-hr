import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-hr';
  isDarkMode = false;

  constructor(private primeng: PrimeNG) {
    this.primeng.theme.set({
      preset: Aura, // Apply the theme
      options: {
        prefix: 'p',
        darkModeSelector: 'app-dark', // Match Tailwind's dark mode class
        cssLayer: {
          name: 'primeng',
          order: 'tailwind-base, primeng, tailwind-utilities',
        },
      },
    });

    // Check local storage for theme preference on app load
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.toggleDarkMode(isDarkMode);
  }

  toggleDarkMode(isDarkMode: boolean) {
    if (isDarkMode) {
      document.body.classList.add('app-dark'); // Add dark mode class
    } else {
      document.body.classList.remove('app-dark'); // Remove dark mode class
    }
    localStorage.setItem('darkMode', isDarkMode.toString()); // Save preference
  }
}

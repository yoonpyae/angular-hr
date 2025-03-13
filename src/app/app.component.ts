import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-hr';
  isDarkMode = false;

  constructor(private primeng: PrimeNG) {
    this.primeng.theme.set({
      preset: Aura,
      options: {
        prefix: 'p',
        darkModeSelector: 'app-dark', // Ensure Tailwind is using this
        cssLayer: {
          name: 'primeng',
          order: 'tailwind-base, primeng, tailwind-utilities',
        },
      },
    });

    // Load dark mode preference from local storage
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.applyDarkMode();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', String(this.isDarkMode));
    this.applyDarkMode();
  }

  applyDarkMode() {
    if (this.isDarkMode) {
      document.body.classList.add('app-dark'); // Add dark mode class
    } else {
      document.body.classList.remove('app-dark'); // Remove dark mode class
    }
  }
}

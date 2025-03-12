import { Component } from '@angular/core';
import { DarkModeService } from '../../core/services/dark-mode.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dark-mode-toggle',
  imports: [ButtonModule],
  templateUrl: './dark-mode-toggle.component.html',
  styleUrl: './dark-mode-toggle.component.scss',
})
export class DarkModeToggleComponent {
  isDarkMode = false;

  constructor(private darkModeService: DarkModeService) {
    this.isDarkMode = document.documentElement.classList.contains('dark-mode');
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
    this.isDarkMode = document.documentElement.classList.contains('dark-mode');
  }
}

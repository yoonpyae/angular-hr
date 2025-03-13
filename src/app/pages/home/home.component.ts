import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { DarkModeService } from '../../core/services/dark-mode.service';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-home',
  imports: [
    DrawerModule,
    ButtonModule,
    RouterModule,
    TabsModule,
    CommonModule,
    CardModule,
    FormsModule,
    DatePicker,
    Message,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  visible: boolean = false;
  rangeDates: Date[] | undefined;

  isDarkMode = false;

  constructor(private darkModeService: DarkModeService) {
    this.isDarkMode = document.documentElement.classList.contains('dark-mode');
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
    this.isDarkMode = document.documentElement.classList.contains('dark-mode');
  }
}

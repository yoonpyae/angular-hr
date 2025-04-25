import { Component, OnInit } from '@angular/core';
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
import { CookieService } from 'ngx-cookie-service';
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
  providers: [CookieService],
})
export class HomeComponent implements OnInit {
  visible: boolean = false;
  rangeDates: Date[] | undefined;

  inputKey: string = ''; // To store the cookie key
  inputValue: string = ''; // To store the cookie value
  cookies: { key: string; value: string }[] = [];

  isDarkMode = false;

  constructor(private darkModeService: DarkModeService, private cookieService: CookieService) {
    this.isDarkMode = document.documentElement.classList.contains('dark-mode');
  }

  ngOnInit(): void {
    this.loadAllCookies();
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
    this.isDarkMode = document.documentElement.classList.contains('dark-mode');
  }

  saveCookie(): void {
    if (this.inputKey.trim() && this.inputValue.trim()) {
      const expirationDate = new Date();
      expirationDate.setSeconds(expirationDate.getSeconds() + 50); // Set expiration to 5 seconds from now
      this.cookieService.set(this.inputKey, this.inputValue, { expires: expirationDate });
      console.log(`Cookie set: ${this.inputKey} = ${this.inputValue}`);
  
      // Clear the input fields
      this.inputKey = '';
      this.inputValue = '';
  
      // Reload all cookies
      this.loadAllCookies();
    } else {
      console.log('Key or value is empty. Please enter both.');
    }
  }

  loadAllCookies(): void {
    // Get all cookies and store them in the `cookies` array
    this.cookies = [];
    const allCookies = this.cookieService.getAll();
    for (const key in allCookies) {
      this.cookies.push({ key, value: allCookies[key] });
    }
  }

  deleteCookie(key: string): void {
    // Delete the specified cookie
    this.cookieService.delete(key);
    console.log(`Cookie deleted: ${key}`);

    // Reload all cookies
    this.loadAllCookies();
  }

  clearAllCookies(): void {
    // Delete all cookies
    this.cookieService.deleteAll();
    console.log('All cookies deleted.');

    // Reload all cookies
    this.loadAllCookies();
  }

  checkCookieStatus(): void {
    const allCookies = this.cookieService.getAll();
    this.cookies = this.cookies.map((cookie) => ({
      key: cookie.key,
      value: allCookies[cookie.key] || 'Expired',
    }));
  }
}

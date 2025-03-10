import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home',
  imports: [ButtonModule, RouterModule, TabsModule, CommonModule, CardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}

import { Component, OnInit } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'irish-maths';
  isDarkMode = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    const saved = localStorage.getItem('theme');
    this.isDarkMode = saved === 'dark';
    this.applyTheme();
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  private applyTheme(): void {
    document.documentElement.setAttribute('data-bs-theme', this.isDarkMode ? 'dark' : 'light');
    this.themeService.setDarkMode(this.isDarkMode);
  }
}

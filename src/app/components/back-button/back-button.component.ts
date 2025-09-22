import { Location } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [],
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent {
  readonly themeColor = input<'primary' | 'accent' | 'warn'>('primary');
  readonly tooltip = input('Go Back');

  private location = inject(Location);
  private router = inject(Router);

  goBack() {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/books']); 
    }
  }
}

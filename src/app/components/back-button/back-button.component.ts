import { Location } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [],
  template: `
    <div class="pt-4 pl-4">
      <button
        (click)="goBack()"
        [title]="tooltip()"
        class="w-12 h-12 flex items-center justify-center rounded-full 
              bg-white text-gray-700 shadow-md hover:shadow-lg 
              hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 
              transition-transform transform hover:-translate-y-1 active:scale-95"
      >
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>`
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

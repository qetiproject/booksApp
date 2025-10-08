import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BackButtonDirective } from '../../features/directives/back-button.directive';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [BackButtonDirective],
  template: `
    <div class="pt-4 pl-4">
      <button
        (click)="goBack()"
        appBackBtnClass
      >
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
  `
})
export class BackButtonComponent {

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

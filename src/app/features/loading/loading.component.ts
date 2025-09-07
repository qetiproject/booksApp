import { Component, inject } from '@angular/core';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-loading',
  imports: [MatProgressSpinner],
  template: `
    @if(loading()) {
      <div class="spinner-overlay">
        <mat-spinner />
      </div>
    }
  `,
   styles: [`
    .spinner-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(255, 255, 255, 0.6);
      z-index: 1000;
    }
  `]
})
export class LoadingComponent {
  loadingService = inject(LoadingService);

  loading = this.loadingService.loading;
}

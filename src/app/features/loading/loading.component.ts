import { Component, inject } from '@angular/core';
import { LoadingService } from '@core';

@Component({
  selector: 'app-loading',
  standalone: true,
  template: `
    @if(loading()) {
      <div class="fixed inset-0 flex items-center justify-center bg-white/60 z-[1000]">
        <div
          class="h-8 w-8 sm:h-10 sm:w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        ></div>
      </div>
    }
  `
})
export class LoadingComponent {
  loadingService = inject(LoadingService);
  loading = this.loadingService.loading;
}

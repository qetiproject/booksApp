import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MessagesService } from '../../core/services/messages.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  template: `
  @if (message()){
    <div
      [ngClass]="positionClasses[message()?.position || 'top-right']" 
      class="fixed z-50 flex flex-col gap-2">
      <div
        class="flex items-center justify-between px-4 py-2 rounded-lg shadow-lg max-w-xs w-full
              text-white text-sm font-medium animate-slide-in"
        [ngClass]="{
          'bg-green-500': message()?.severity === 'success',
          'bg-red-500': message()?.severity === 'error',
          'bg-blue-500': message()?.severity === 'info',
          'bg-yellow-400': message()?.severity === 'warning'
        }"
      >
        <span>{{ message()?.text }}</span>
        <button (click)="onClose()" class="ml-2 text-white font-bold hover:opacity-80 transition">
          ✖
        </button>
      </div>
    </div>
  }`,
  styles: `
    @keyframes slide-in {
      0% { transform: translateX(100%); opacity: 0; }
      100% { transform: translateX(0); opacity: 1; }
    }

    @keyframes slide-out {
      0% { transform: translateX(0); opacity: 1; }
      100% { transform: translateX(100%); opacity: 0; }
    }

    .animate-slide-in {
      animation: slide-in 0.3s ease-out forwards;
    }

    .animate-slide-out {
      animation: slide-out 0.3s ease-in forwards;
    }`
})
export class MessagesComponent {
  messageService = inject(MessagesService);

  message = this.messageService.message;

  positionClasses = {
    'top-right': 'top-5 right-5',
    'top-left': 'top-5 left-5',
    'bottom-right': 'bottom-5 right-5',
    'bottom-left': 'bottom-5 left-5'
  } as const;

  onClose(): void {
    this.messageService.clear();
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MessagesService } from '../../core/services/messages.service';
import { MessageDirective } from '../../features/directives/message.directive';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, MessageDirective],
  template: `
  @if (message()){
    <div
      appMessageClass 
      class="fixed z-50 flex flex-col gap-2">
      <div
        class="flex items-center justify-between px-4 py-2 rounded-lg shadow-lg max-w-xs w-full
              text-white text-sm font-medium animate-slide-in"
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
  
  onClose(): void {
    this.messageService.clear();
  }
}

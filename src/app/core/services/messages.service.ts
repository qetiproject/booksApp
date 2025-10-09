import { Injectable, signal } from '@angular/core';
import { Message } from '@types';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

 #messagesSignal = signal<Message | null>(null);

 message = this.#messagesSignal.asReadonly();

  showMessage(message: Message): void {
    const duration = message.duration ?? 3000;
      this.#messagesSignal.set({
        text: message.text,
        severity: message.severity,
        position: message.position
      })

      setTimeout(() => {
        this.clear();
      }, duration);
  }

  clear(): void {
    this.#messagesSignal.set(null);
  }
}

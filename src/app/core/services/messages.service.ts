import { Injectable, signal } from '@angular/core';
import { Message, MessageSeverity } from '../../types/common';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

 #messagesSignal = signal<Message | null>(null);

 message = this.#messagesSignal.asReadonly();

 showMessage(text: string, severity: MessageSeverity): void {
  this.#messagesSignal.set({
    text, severity
  })
 }

 clear(): void {
  this.#messagesSignal.set(null);
 }
}

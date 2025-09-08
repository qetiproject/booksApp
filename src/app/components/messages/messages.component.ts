import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MessagesService } from '../../core/services/messages.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  messageService = inject(MessagesService);

  message = this.messageService.message;

  onClose(): void {
    this.messageService.clear();
  }
}

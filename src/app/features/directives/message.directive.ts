import { Directive, HostBinding, inject } from '@angular/core';
import { MessagesService } from '@core/services/messages.service';
import { MessagePosition, MessageSeverity } from '@types';

@Directive({
  selector: '[appMessageClass]',
  standalone: true
})
export class MessageDirective {
  private messageService = inject(MessagesService);
  message = this.messageService.message; 

  private readonly severityClasses: Record<MessageSeverity, string> = {
    [MessageSeverity.Success]: 'bg-green-500',
    [MessageSeverity.Error]: 'bg-red-500',
    [MessageSeverity.Info]: 'bg-blue-500',
    [MessageSeverity.Warning]: 'bg-yellow-400'
  };

  private readonly positionClasses: Record<MessagePosition, string> = {
    [MessagePosition.TopRight]: 'top-5 right-5',
    [MessagePosition.TopLeft]: 'top-5 left-5',
    [MessagePosition.BottomRight]: 'bottom-5 right-5',
    [MessagePosition.BottomLeft]: 'bottom-5 left-5'
  };

  @HostBinding('class')
  get hostClasses(): string {
    const msg = this.message();
    if (!msg) return '';

    const severityClass = this.severityClasses[msg.severity];
    const positionClass = this.positionClasses[msg.position || MessagePosition.BottomRight];

    return `fixed z-50 flex flex-col gap-2 ${positionClass} ${severityClass}`;
  }
}

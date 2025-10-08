// import { Directive, HostBinding, inject } from "@angular/core";
// import { MessagesService } from "../../core/services/messages.service";
// import { MessagePosition, MessageSeverity } from "../../types/common";

// @Directive({
//     selector: '[appMessageClass]',
//     standalone: true
// })
// export class MessageSeverityDirective {
//     // messageService = inject(MessagesService);

//     // message = this.messageService.message;

//     // @HostBinding('class')
//     // get messageSeverityClass() {
//     //     if(!this.message()?.severity) return '';
//     //     switch (this.message()?.severity) {
//     //         case MessageSeverity.Success: return 'bg-green-500';
//     //         case MessageSeverity.Error:   return 'bg-red-500';
//     //         case MessageSeverity.Info:    return 'bg-blue-500';
//     //         case MessageSeverity.Warning: return 'bg-yellow-400';
//     //         default:  return '';
//     //     }
//     // }

//     // @HostListener('class')
//     // positionClasses = {
//     //     MessagePosition.TopRight: 'top-5 right-5',
//     //     'top-left': 'top-5 left-5',
//     //     'bottom-right': 'bottom-5 right-5',
//     //     'bottom-left': 'bottom-5 left-5'
//     // } as const;
//     private messageService = inject(MessagesService);
//   message = this.messageService.message;

//   private readonly severityClasses: Record<MessageSeverity, string> = {
//     success: 'bg-green-500',
//     error: 'bg-red-500',
//     info: 'bg-blue-500',
//     warning: 'bg-yellow-400'
//   };

//   private readonly positionClasses: Record<MessagePosition, string> = {
//     'top-right': 'top-5 right-5',
//     'top-left': 'top-5 left-5',
//     'bottom-right': 'bottom-5 right-5',
//     'bottom-left': 'bottom-5 left-5'
//   };

//   @HostBinding('class')
//   get hostClasses(): string {
//     const msg = this.message();
//     if (!msg) return '';

//     const severityClass = this.severityClasses[msg.severity] || '';
//     const positionClass = this.positionClasses[msg.position || 'top-right'];

//     return `fixed z-50 flex flex-col gap-2 ${positionClass} ${severityClass}`;
//   }
// }
import { inject, Pipe, PipeTransform } from "@angular/core";
import { VALIDATION_ERROR_MESSAGES } from ".";

@Pipe({
    name: 'errorMessage',
    standalone: true
})
export class ErrorMessagePipe implements PipeTransform {
    
    private errorMessages = inject(VALIDATION_ERROR_MESSAGES);

    transform(key: string, errValue: string | number) {
        if(!this.errorMessages[key]) return '';
        return this.errorMessages[key](errValue)
    }
    
}
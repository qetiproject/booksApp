import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: 'app-textarea',
    standalone: true,
    imports: [],
    template: `
        <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">{{ label }}</label>
            <textarea
                [placeholder]="placeholder || ('Enter ' + label)"
                [value]="value"
                (input)="handleInput($event)"
                type="text"
                rows="3"
                class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            ></textarea>
        </div>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextareaComponent),
            multi: true
        }
    ]
})
export class TextareaComponent implements ControlValueAccessor {
    @Input() label: string = '';
    @Input() placeholder: string = '';

    value: string = ''

    onChange = (value: string) => {};
    onTouched = () => {};

    writeValue(value: string): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    handleInput(event: Event) {
        const target = event.target as HTMLTextAreaElement;
        const val = target.value;
        this.value = val;
        this.onChange(val);
    }

}
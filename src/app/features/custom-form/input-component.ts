import { CommonModule } from "@angular/common";
import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";

export type InputType = 'text' | 'password';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="mb-2">
        <label class="block text-sm font-medium text-gray-700 mb-1">{{ label }}</label>
        <input
            [type]="type"
            [placeholder]="placeholder || ('Enter ' + label)"
            [value]="value"
            (input)="handleInput($event.target.value)"
            (blur)="onTouched()"
            class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
  `,
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputComponent),
        multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor{
    @Input() label: string = '';
    @Input() placeholder: string = '';
    @Input() type: InputType = 'text';

    value: string = '';
    onChange = (value: string) => {}
    onTouched = () => {}

    writeValue(value: string): void {
        this.value = value
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    handleInput(val: string) {
        this.value = val;
        this.onChange(val); 
    }
}

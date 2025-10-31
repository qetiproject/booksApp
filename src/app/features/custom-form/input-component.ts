import { CommonModule } from "@angular/common";
import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";

export enum InputType {
    Text = 'text',
    Password = 'password'
} 

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
        <div class="mb-4 relative">
        <label class="block text-sm font-medium text-gray-700 mb-1">{{ label }}</label>
        <div class="relative">
            <input
                [type]="inputType"
                [placeholder]="placeholder || ('Enter ' + label)"
                [value]="value"
                (input)="handleInput($event.target.value)"
                (blur)="onTouched()"
                class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"/> 
            <button
                *ngIf="type === 'password'"
                type="button"
                (click)="togglePassword()"
                class="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
                <svg *ngIf="!showPassword" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg *ngIf="showPassword" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.965 9.965 0 012.592-4.264m3.65-2.282A9.959 9.959 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.961 9.961 0 01-4.121 5.066M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 3l18 18" />
                </svg>
            </button>
        </div>
        
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
export class InputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: InputType = InputType.Text;

  get inputType() {
    return this.type === InputType.Password && this.showPassword ? InputType.Text : this.type;
  }

  value: string = '';
  showPassword: boolean = false;

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void { this.value = value; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

  handleInput(val: string) { this.value = val; this.onChange(val); }
  togglePassword() { this.showPassword = !this.showPassword; }
}

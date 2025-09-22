
import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

export interface SelectOption<T = unknown> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [MatSelectModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent<T = unknown> implements ControlValueAccessor {
  options = input<SelectOption<T>[]>([]);
  label = input<string>('');

  value = signal<T | null>(null);
  disabled = false;

  // ControlValueAccessor callbacks
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = (_: T | null) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};

  writeValue(value: T | null): void {
    this.value.set(value);
  }
   
  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  selectOption(event: Event) {
    const selectEl = event.target as HTMLSelectElement;
    const val = selectEl.value  as T | null;
    this.value.set(val);
    this.onChange(this.value());
    this.onTouched();
  }
}

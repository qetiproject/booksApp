import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

export interface SelectOption {
  label: string;
  value: string | number | unknown;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, MatSelectModule],
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
export class SelectComponent implements ControlValueAccessor {
  @Input() options: SelectOption[]= [];
  @Input() label = '';

  value: string | number | unknown = null;
  disabled = false;

  // ControlValueAccessor callbacks
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = (_: string | number | unknown) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};

  writeValue(value: string | number | unknown): void {
    this.value = value;
  }
   
  registerOnChange(fn: never): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: never): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  selectOption(value: string | number | unknown) {
    this.value = value;
    this.onChange(this.value);
    this.onTouched();
  }
}

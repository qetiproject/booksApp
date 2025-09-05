import { ValidatorFn, Validators } from "@angular/forms";

export interface DynamicOptions {
  label: string;
  value: string;
}

interface CustomValidators { banWords: ValidatorFn}
type ValidatorKeys = keyof Omit<typeof Validators & CustomValidators, 'prototype' | 'compose' | 'composeAsync'>;

export interface DynamicControl<T = string> {
  controlType: 'input' | 'select' | 'checkbox' | 'group';
  type?: string;
  label: string;
  value: T | null;
  order: number;
  options?: DynamicOptions[];
  controls?: DynamicFormConfig['controls'];
  validators?: Partial<Record<ValidatorKeys, unknown>>
}

export interface DynamicFormConfig {
  description: string;
  controls: Record<string, DynamicControl>
}

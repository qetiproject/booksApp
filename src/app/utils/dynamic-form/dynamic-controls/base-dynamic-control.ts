import { CommonModule, KeyValue } from '@angular/common';
import { Directive, HostBinding, inject, OnInit, StaticProvider } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CONTROL_DATA } from '../control-data.token';
import { DynamicControl } from '../dynamic-forms.model';

export const comparatorFn = (
    a: KeyValue<string, DynamicControl>,
    b: KeyValue<string, DynamicControl>
  ): number => a.value.order - b.value.order; // > 0 sort a after b

export const sharedDynamicConrolDeps = [CommonModule, ReactiveFormsModule]

export const dynamicControlProvider: StaticProvider =  {
  provide: ControlContainer,
  useFactory: () => inject(ControlContainer, {skipSelf: true})
}

@Directive()
export class BaseDynamicControl implements OnInit{
  @HostBinding('class') hostClass = "form-field"
  control = inject(CONTROL_DATA);

  formControl: AbstractControl = new FormControl(
    this.control.config.value,
    this.resolveValidators(this.control.config)
  );

  private parentGroupDir = inject(ControlContainer);

  ngOnInit(): void {
    (this.parentGroupDir.control as FormGroup).addControl(
      this.control.controlKey,
      this.formControl
    )
  }

  private resolveValidators({ validators = {} }: DynamicControl) {
    return (Object.keys(validators) as (keyof typeof validators)[]).map(validatorKey => {
      const validatorValue = validators[validatorKey];
      if (validatorKey === 'required') {
        return Validators.required;
      }
      if (validatorKey === 'email') {
        return Validators.email;
      }
      if (validatorKey === 'requiredTrue') {
        return Validators.requiredTrue;
      }
      if (validatorKey === 'minLength' && typeof validatorValue === 'number') {
        return Validators.minLength(validatorValue);
      }
      return Validators.nullValidator;
    })
  }

  // შიდა კომპონენტებში formgroup რომ გაგვეწერა მაგისთვის იყო
  // get formGroup() {
  //   return this.parentFormGroup.control as FormGroup;
  // }
  // private parentFormGroup = inject(ControlContainer);
}

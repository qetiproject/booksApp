import { Component } from '@angular/core';
import { BaseDynamicControl, dynamicControlProvider, sharedDynamicConrolDeps } from './base-dynamic-control';

@Component({
  selector: 'app-dynamic-select',
  standalone: true,
  imports: [...sharedDynamicConrolDeps],
  viewProviders: [dynamicControlProvider],
  template: `
    <label [for]="control.controlKey">{{control.config.label}}</label>
    <select [formControlName]="control.controlKey" [id]="control.controlKey" [value]="control.config.value">
      <option *ngFor="let option of control.config.options" [value]="option.value">{{option.label}}</option>
    </select>
  `
})
export class DynamicSelectComponent  extends BaseDynamicControl {}

import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appTabActive]'
})
export class TabActiveDirective {
  @Input('appTabActive') isActive = false;

  @HostBinding('class')
  get classes(): string {
    return this.isActive
      ? 'border-blue-600 text-blue-600'
      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300';
  }
}
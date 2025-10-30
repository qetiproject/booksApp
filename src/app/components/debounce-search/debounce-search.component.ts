
import { Component, effect, output, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debouncedSignal } from '@utils';

@Component({
  selector: 'app-debounce-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './debounce-search.component.html',
})
export class DebounceSearchComponent {
  searchControl = new FormControl('');

  searchValue = output<string>();

  query: WritableSignal<string> = signal('');
  
  debouncedQuery = debouncedSignal(this.query, 400);

  constructor() {
    this.searchControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(value => {
        this.query.set(value?.trim() || '');
    });

    
    effect(() => {
      this.searchValue.emit(this.debouncedQuery());
    });
  }

  clear() {
    this.searchControl.setValue('');
  }

}

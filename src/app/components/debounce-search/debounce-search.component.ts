
import { Component, effect, output, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debouncedSignal } from '@utils/debouncedSignal';

@Component({
  selector: 'app-debounce-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './debounce-search.component.html',
})
export class DebounceSearchComponent {
  searchControl = new FormControl('');

  // Writable signal რომ აიღოს შედეგები
  searchValue = output<string>();

  // 1️⃣ query სიგნალი (writable)
  query: WritableSignal<string> = signal('');
  
  // 2️⃣ debounce
  debouncedQuery = debouncedSignal(this.query, 400);

  constructor() {
    // FormControl → Signal binding
    this.searchControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(value => {
        this.query.set(value?.trim() || '');
    });

    
    // Effect უშვებს debounce-ს
    effect(() => {
      this.searchValue.emit(this.debouncedQuery());
    });
  }

  clear() {
    this.searchControl.setValue('');
  }

}

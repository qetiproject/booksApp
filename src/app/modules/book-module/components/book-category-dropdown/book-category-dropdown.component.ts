
import { Component, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookCategories } from '@book-module';
import { SelectComponent } from '@components';
import { SelectModel } from '@types';

@Component({
  selector: 'app-book-category-dropdown',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, SelectComponent],
  template: `
    <app-select [formControl]="category"
      [options]="categories"
    />`
})
export class BookCategoryDropdownComponent {

  readonly categories: SelectModel[] = [
    { label: 'Choose Book Category', value: null},
    ...Object.values(BookCategories).map(category => ({
      label: category,
      value: category
    }))
  ]
  category = new FormControl<string | null>(null);

  categorySelected = output<string | null>();

  constructor() {
    this.category.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(x => {this.categorySelected.emit(x)})
  }
  
}
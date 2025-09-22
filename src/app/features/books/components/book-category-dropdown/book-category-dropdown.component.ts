
import { Component, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../../../../components/select/select.component';
import { SelectModel } from '../../../../types/common';
import { BookCategories, } from '../../types/book';

@Component({
  selector: 'app-book-category-dropdown',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, SelectComponent],
  templateUrl: './book-category-dropdown.component.html',
  styleUrls: ['./book-category-dropdown.component.css']
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
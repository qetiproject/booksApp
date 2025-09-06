import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../../../../components/select/select.component';
import { BookCategories } from '../../types/book';

export interface Category  {
  label: string;
  value: string;
}
@Component({
  selector: 'app-book-category-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormsModule, SelectComponent],
  templateUrl: './book-category-dropdown.component.html',
  styleUrls: ['./book-category-dropdown.component.css']
})
export class BookCategoryDropdownComponent {

  readonly categories: Category[] = Object.values(BookCategories).map(category => ({
    label: category,
    value: category
  }));
  category = new FormControl('');

  categorySelected = output<string | null>();

  constructor() {
    this.category.valueChanges.subscribe(x => {this.categorySelected.emit(x)})
  }
}
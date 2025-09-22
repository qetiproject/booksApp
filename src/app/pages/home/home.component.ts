
import { Component, signal } from '@angular/core';
import { DebounceSearchComponent } from '../../components/debounce-search/debounce-search.component';
import { BookCategoryDropdownComponent } from '../../features/books/components/book-category-dropdown/book-category-dropdown.component';
import { BookListComponent } from "../../features/books/components/book-list/book-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DebounceSearchComponent, BookListComponent, BookCategoryDropdownComponent, BookCategoryDropdownComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  searchQuery = signal<string>('');
  categorySelected = signal<string | null>(null);
  
  onSearchEvent(value: string): void {
    this.searchQuery.set(value);
  }

  onCategorySelectedEvent(value: string | null): void {
    this.categorySelected.set(value)
  }

}

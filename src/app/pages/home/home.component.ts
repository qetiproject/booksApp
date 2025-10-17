
import { Component, signal } from '@angular/core';
import { BookCategoryDropdownComponent } from '@book-module/components/book-category-dropdown/book-category-dropdown.component';
import { BookListComponent } from '@book-module/components/book-list/book-list.component';
import { DebounceSearchComponent, PagingComponent } from '@components';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DebounceSearchComponent, 
    BookListComponent, 
    BookCategoryDropdownComponent, 
    PagingComponent
  ],
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

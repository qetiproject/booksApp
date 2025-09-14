import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { DebounceSearchComponent } from '../../components/debounce-search/debounce-search.component';
import { selectIsLoggedIn } from '../../features/auth/store/auth.selector';
import { BookCategoryDropdownComponent } from '../../features/books/components/book-category-dropdown/book-category-dropdown.component';
import { BookListComponent } from "../../features/books/components/book-list/book-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DebounceSearchComponent, BookListComponent, BookCategoryDropdownComponent, BookCategoryDropdownComponent],
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

    constructor(private store: Store) {
        this.store.select(selectIsLoggedIn).subscribe(isLoggedIn => {
        console.log('User is logged in:', isLoggedIn);
        });
    }
}

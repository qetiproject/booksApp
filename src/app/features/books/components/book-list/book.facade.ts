import { computed, inject, Injectable, signal, WritableSignal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { FavouriteBookService } from "../../../../pages/wishlist/services/favouriteBook.service";
import { BookService } from "../../services/book.service";
import { LoadBooks, LoadBooksFailure } from "../../store/book.action";
import { selectBooks } from "../../store/book.selector";
import { BooksView } from "../../types/book";

@Injectable({
    providedIn: 'root'
})
export class BookFacadeService {
    #bookService = inject(BookService);
    #favouriteService = inject(FavouriteBookService);
    #store = inject(Store);

    //signal
    private searchedBooks: WritableSignal<BooksView[]> = signal([]);
    booksByCategory = toSignal(this.#store.select(selectBooks), { initialValue: [] });
    
    getBooks = computed(() => {
        const combined = [...this.searchedBooks(), ...this.booksByCategory()];
        const uniqueBooksMap = new Map<string, BooksView>();
        combined.forEach(book => uniqueBooksMap.set(book.id, book));
        return Array.from(uniqueBooksMap.values())
    })

    searchBooksByName(query: string): void {
        if(!query || query.length <=3) {
            this.searchedBooks.set([]);
            return;
        }
        this.#bookService.searchBooksByName(query).subscribe(result => this.searchedBooks.set(result));
    }

    getBooksByCategory(category: string | null): void {
        if(!category) {
            this.#store.dispatch(LoadBooksFailure({error: 'No category selected'}));
            return;
        }
        this.#store.dispatch(LoadBooks({
            query: category
        }))
    }
   
    onAddInFavouriteEvent(book: BooksView): void {
        this.#favouriteService.addBookInFavourite(book);
    }
}
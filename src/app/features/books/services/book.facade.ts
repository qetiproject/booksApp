import { computed, inject, Injectable, signal, WritableSignal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { PagingService } from "../../../components/paging/paging.service";
import { FavouriteBookService } from "../../../pages/wishlist/services/favouriteBook.service";
import { LoadBooks, LoadBooksFailure } from "../store/book.action";
import { selectBooks } from "../store/book.selector";
import { BooksView } from "../types/book";
import { BookService } from "./book.service";

@Injectable({
    providedIn: 'root'
})
export class BookFacadeService {
    #bookService = inject(BookService);
    #favouriteService = inject(FavouriteBookService);
    #store = inject(Store);
    #pagingService = inject(PagingService);
    
    //signal
    private searchedBooks: WritableSignal<BooksView[]> = signal([]);
    booksByCategory = toSignal(this.#store.select(selectBooks), { initialValue: [] });
    
    private getBooks = computed(() => {
        const combined = [...this.searchedBooks(), ...this.booksByCategory()];
        const uniqueBooksMap = new Map<string, BooksView>();
        combined.forEach(book => uniqueBooksMap.set(book.id, book));
        return Array.from(uniqueBooksMap.values())
    })

    startIndex: number = this.#pagingService.currentPage() - 1

    getBooksWithPaging = computed(() => {
        return this.getBooks();
    });

    searchBooksByName(query: string): void {
        if(!query || query.length <=3) {
            this.searchedBooks.set([]);
            return;
        }
        this.#bookService.searchBooksByName(
            query, 
            this.#pagingService.maxResults(), 
            this.startIndex
        ).subscribe(result => this.searchedBooks.set(result));
    }

    getBooksByCategory(category: string | null): void {
        if(!category) {
            this.#store.dispatch(LoadBooksFailure({error: 'No category selected'}));
            this.#store.select(selectBooks)
            return;
        }
        
        this.#store.dispatch(LoadBooks({
            query: category,
            maxResults: this.#pagingService.maxResults(),
            startIndex: this.startIndex
        }))
    }
   
    onAddInFavouriteEvent(book: BooksView): void {
        this.#favouriteService.addBookInFavourite(book);
    }
}
import { inject, Injectable } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { FavouriteBookService } from "@pages/wishlist/services/favouriteBook.service";
import { PagingService } from "components/paging/paging.service";
import { LoadBooks, LoadBooksFailure } from "../store/book.action";
import { selectBooks } from "../store/book.selector";
import { BooksView } from "../types";

@Injectable({
    providedIn: 'root'
})
export class BookFacadeService {
    #favouriteService = inject(FavouriteBookService);
    #store = inject(Store);
    #pagingService = inject(PagingService);
    
    //signal
    books = toSignal(this.#store.select(selectBooks), { initialValue: [] });

    private getStartIndex() {
        return this.#pagingService.currentPage() - 1;
    }
    
    getBooks(query: string | null, category: string | null): void {
        if (query && query.length > 3) {
            category = null;
            this.#store.dispatch(LoadBooks({
                query,
                maxResults: this.#pagingService.maxResults(),
                startIndex: this.getStartIndex()
            }));
        } else if (category) {
            query = null;
            this.#store.dispatch(LoadBooks({
                query: category, 
                maxResults: this.#pagingService.maxResults(),
                startIndex: this.getStartIndex()
            }));
        } else {
            this.#store.dispatch(LoadBooksFailure({ error: 'No query or category selected' }));
        }
    }

   
    onAddInFavouriteEvent(book: BooksView): void {
        this.#favouriteService.addBookInFavourite(book);
    }

    resetPage() {
        this.#pagingService.setCurrentPage();
    }
}
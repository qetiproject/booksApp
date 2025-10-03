import { inject, Injectable } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { PagingService } from "../../../components/paging/paging.service";
import { FavouriteBookService } from "../../../pages/wishlist/services/favouriteBook.service";
import { LoadBooks, LoadBooksFailure } from "../store/book.action";
import { selectBooks } from "../store/book.selector";
import { BooksView } from "../types/book";

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

    searchBooksByName(query: string): void {
        if(!query || query.length <=3) {
            this.#store.dispatch(LoadBooksFailure({error: 'No query'}));
            this.#store.select(selectBooks)
            return;
        }
        this.resetPage();
        this.#store.dispatch(LoadBooks({
            query,
            maxResults: this.#pagingService.maxResults(),
            startIndex: this.getStartIndex()
        }))
    }

    getBooksByCategory(category: string | null): void {
        if(!category) {
            this.#store.dispatch(LoadBooksFailure({error: 'No category selected'}));
            this.#store.select(selectBooks)
            return;
        }

        this.resetPage();
        
        this.#store.dispatch(LoadBooks({
            query: category,
            maxResults: this.#pagingService.maxResults(),
            startIndex: this.getStartIndex()
        }))
    }
   
    onAddInFavouriteEvent(book: BooksView): void {
        this.#favouriteService.addBookInFavourite(book);
    }

    resetPage() {
        this.#pagingService.setCurrentPage();
    }
}
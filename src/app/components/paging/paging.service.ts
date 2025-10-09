import { computed, inject, Injectable } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { setCurrentPage } from "../../features/books/store/book.action";
import { selectCurrentPage, selectMaxResults, selectTotalItems, selectWindowSize } from "../../features/books/store/book.selector";

@Injectable({
    providedIn: 'root'
})
export class PagingService {
    #store = inject(Store);
    currentPage = toSignal(
        this.#store.select(selectCurrentPage), 
        { initialValue: 1 }
    );
    maxResults = toSignal(this.#store.select(selectMaxResults), { initialValue: 10 });
    totalItems = toSignal(this.#store.select(selectTotalItems), { initialValue: 0 });
    windowSize = toSignal(this.#store.select(selectWindowSize), { initialValue: 5 });
    maxPage = computed(() => {
        const maxResults = this.maxResults();
        const total = this.totalItems();
        return Math.ceil(total / maxResults);
    });

    nextPage(): void {
        if (this.currentPage() < this.maxPage()) {
            this.#store.dispatch(setCurrentPage({ page: this.currentPage() + 1 }));
        }
    }

     prevPage(): void {
        if (this.currentPage() > 1) {
            this.#store.dispatch(setCurrentPage({ page: this.currentPage() - 1 }));
        }
    }

    goToPage(page: number) {
        if (page >= 1 && page <= this.maxPage()) {
            this.#store.dispatch(setCurrentPage({ page }));
        }
    }

    visiblePages(): number[] {
        const max = this.maxPage();
        const current = this.currentPage();

        let start = Math.floor((current - 1) / this.windowSize()) * this.windowSize() + 1;
        let end = Math.min(start + this.windowSize() - 1, max);

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }

    setCurrentPage(page: number = 1): void {
        this.#store.dispatch(setCurrentPage({page}))
    }
}

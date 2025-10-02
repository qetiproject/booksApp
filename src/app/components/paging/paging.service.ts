import { computed, inject, Injectable, signal, WritableSignal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { selectMaxResults, selectTotalItems } from "../../features/books/store/book.selector";

@Injectable({
    providedIn: 'root'
})
export class PagingService {
    #store = inject(Store);
    currentPage: WritableSignal<number> = signal(1);
    maxResults = toSignal(this.#store.select(selectMaxResults), { initialValue: 10 });
    totalItems = toSignal(this.#store.select(selectTotalItems), { initialValue: 0 });
    maxPage = computed(() => {
        const maxResults = this.maxResults();
        const total = this.totalItems();
        return Math.ceil(total / maxResults);
    });
    windowSize: number = 5

    nextPage(): void {
        if ((this.currentPage() - 1) < this.maxPage()) {
            this.currentPage.update(p => p + 1);
        }
    }

    prevPage(): void {
        if ((this.currentPage() - 1) > 0) {
            this.currentPage.update(p => p - 1);
        }
    }

    getCurrentRange() {
        const currentPage = this.currentPage();
        const maxResults = this.maxResults();
        const total = this.totalItems();

        const start = (currentPage - 1) * maxResults;
        const end = Math.min(start + maxResults, total);

        return { start, end };
    }

    visiblePages(): number[] {
        const max = this.maxPage();
        const current = this.currentPage();

        let start = Math.floor((current - 1) / this.windowSize) * this.windowSize + 1;
        let end = Math.min(start + this.windowSize - 1, max);

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }
}

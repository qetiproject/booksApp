import { computed, inject, Injectable, signal, WritableSignal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { selectPageSize, selectTotalItems } from "../../features/books/store/book.selector";

@Injectable({
    providedIn: 'root'
})
export class PagingFacadeService {
    #store = inject(Store);
    currentPage: WritableSignal<number> = signal(1);
    pageSize = toSignal(this.#store.select(selectPageSize), { initialValue: 10 });
    totalItems = toSignal(this.#store.select(selectTotalItems), { initialValue: 0 });
    maxPage = computed(() => {
        const size = this.pageSize() ?? 5;
        const total = this.totalItems() ?? 0;
        return Math.ceil(total / size);
    });
    windowSize: number = 10

    nextPage(): void {
        console.log(this.currentPage(), "current");
        console.log(this.maxPage(), "maxpage")
        if (this.currentPage() < this.maxPage()) {
            this.currentPage.update(p => p + 1);
        }
    }

    prevPage(): void {
        if (this.currentPage() > 1) {
            this.currentPage.update(p => p - 1);
        }
    }

    getCurrentRange() {
        const currentPage = this.currentPage();
        const pageSize = this.pageSize();
        const total = this.totalItems();

        const start = (currentPage - 1) * pageSize;
        const end = Math.min(start + pageSize, total);

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

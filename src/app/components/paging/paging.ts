import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { PagingService } from "./paging.service";

@Component({
    selector: 'app-paging',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './paging.html',
})
export class PagingComponent {
    #pagingService = inject(PagingService);

    nextPage(): void {
        this.#pagingService.nextPage();
    }

    prevPage(): void {
        this.#pagingService.prevPage();
    }

    goToPage(page: number): void {
        this.#pagingService.currentPage.set(page);
    }

    currentPage(): number {
        return this.#pagingService.currentPage();
    }

    maxPage(): number {
        return this.#pagingService.maxPage();
    }

    visiblePages(): number[] {
        return this.#pagingService.visiblePages()
    }
}

import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { PagingFacadeService } from "./paging.facade";

@Component({
    selector: 'app-paging',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './paging.html',
})
export class PagingComponent {
    #pagingFacade = inject(PagingFacadeService);

    nextPage(): void {
        this.#pagingFacade.nextPage();
    }

    prevPage(): void {
        this.#pagingFacade.prevPage();
    }

    goToPage(page: number): void {
        this.#pagingFacade.currentPage.set(page);
    }

    currentPage(): number {
        return this.#pagingFacade.currentPage();
    }

    maxPage(): number {
        return this.#pagingFacade.maxPage();
    }

    visiblePages(): number[] {
        return this.#pagingFacade.visiblePages()
    }
}

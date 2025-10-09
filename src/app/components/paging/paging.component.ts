import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { PagingService } from "./paging.service";

@Component({
    selector: 'app-paging',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './paging.component.html',
})
export class PagingComponent {
    #pagingService = inject(PagingService);

    nextPage(): void {
        this.#pagingService.nextPage();
    }

    prevPage(): void {
        this.#pagingService.prevPage();
    }

    goToPage(page: number) {
        this.#pagingService.goToPage(page); 
    }

    get currentPage() {
        return this.#pagingService.currentPage();
    }

    get maxPage() {
        return this.#pagingService.maxPage();
    }

    get visiblePages() {
        return this.#pagingService.visiblePages();
    }

}

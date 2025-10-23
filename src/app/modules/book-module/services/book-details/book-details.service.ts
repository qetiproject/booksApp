import { inject, Injectable, TemplateRef } from "@angular/core";
import { BookDetails } from "@book-module";
import { Tab, } from "@types";
import { BookDetailsFacade } from "./book-details.facade";

@Injectable({
    providedIn: 'root'
})
export class BookDetailsService {
    #bookDetailsFacade = inject(BookDetailsFacade);

    goBack(): void {
        this.#bookDetailsFacade.goBack();
    }

    tabs(
        reviewsTemplate: TemplateRef<unknown>, 
        addReviewTemplate: TemplateRef<unknown>
    ): Tab[] {
        return this.#bookDetailsFacade.tabs(reviewsTemplate, addReviewTemplate)
    }

    addToFavouritesEvent(book: BookDetails): void {
        this.#bookDetailsFacade.addToCatalogueEvent(book);
    }

     addToCatalogueEvent(book: BookDetails): void {
        this.#bookDetailsFacade.addToCatalogueEvent(book);
     }

}
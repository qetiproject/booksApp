import { Component, output } from "@angular/core";

@Component({
    selector: 'app-book-actions',
    standalone: true,
    imports: [],
    templateUrl: './book-actions.Component.html'
})
export class BookActionsComponent {
    addToFavourites = output<void>();
    addToCatalogue = output<void>();

    addToCatalogueEvent(): void {
        this.addToCatalogue.emit()
    }

    addToFavouritesEvent(): void {
        this.addToFavourites.emit()
    }
}
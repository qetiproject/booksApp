import { Location } from '@angular/common';
import { inject, Injectable, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import { BookDetails } from '@book-module-types/book-details';
import { BooksView } from '@book-module/types';
import { MessagesService } from '@core/services/messages.service';
import { CatalogueService } from '@pages/catalogues/services/catalogue.service';
import { FavouriteBookService } from '@pages/wishlist/services/favouriteBook.service';
import { MessageSeverity, Tab, TabKey } from '@types';

@Injectable({
    providedIn: 'root'
})
export class BookDetailsFacade {
    #location = inject(Location)
    #router = inject(Router);
    #favouriteService = inject(FavouriteBookService);
    #messages = inject(MessagesService);
    #catalogueService = inject(CatalogueService);

    tabs(
        reviewsTemplate: TemplateRef<unknown>, 
        addReviewTemplate: TemplateRef<unknown>
    ): Tab[] {
        if (!reviewsTemplate || !addReviewTemplate) return [];
        return [
            { key: TabKey.reviews, label: TabKey.reviews, template: reviewsTemplate },
            { key: TabKey.addReview, label: TabKey.addReview, template: addReviewTemplate }
        ];
    }

    goBack(): void {
        const canGoBack = window.history.length > 1;
        (canGoBack ? () => this.#location.back() : () => this.#router.navigate(['/books']))();
    }

    addToFavouritesEvent(book: BookDetails): void {
        const booksView: BooksView = {
            id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            language: book.volumeInfo.language,
            imageLinks: {
            thumbnail: book.volumeInfo.imageLinks.thumbnail,
            smallThumbnail: book.volumeInfo.imageLinks.smallThumbnail
            },
            categories: book.volumeInfo.categories
        }
        this.#favouriteService.addBookInFavourite(booksView);
        this.#router.navigateByUrl('/favourites')
        this.#messages.showMessage({
            text: `📚 "${book.volumeInfo.title}" წარმატებით დაემატა თქვენს ფავორიტებში!`,
            severity: MessageSeverity.Success
        })
    }

    addToCatalogueEvent(book: BookDetails): void {
        this.#catalogueService.addBook(book);
        this.#router.navigateByUrl('/catalogue')
        this.#messages.showMessage({
        text: `📚 "${book.volumeInfo.title}" წარმატებით დაემატა თქვენს კატალოგში!`,
        severity: MessageSeverity.Success
        })
    }
}
import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef } from '@angular/core';
import { BackButtonComponent } from "../../../../components/back-button/back-button.component";
import { BookCardComponent } from '../../../books/components/book-card/book-card.component';
import { BooksView } from '../../../books/types/book';
import { CatalogueService } from '../../services/catalogue.service';

@Component({
  selector: 'app-catalogues',
  standalone: true,
  imports: [CommonModule, BookCardComponent, BackButtonComponent],
  templateUrl: './catalogues.component.html',
  styleUrls: ['./catalogues.component.scss']
})
export class CataloguesComponent {

  private catalogueService = inject(CatalogueService);

  books$ = this.catalogueService.books$;
 
  bookCardTemplate = TemplateRef<BooksView>

  onDeleteBookEvent(book: BooksView) {
    this.catalogueService.removeBook(book)
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef } from '@angular/core';
import { BookCardComponent, BooksView } from '@book-module';
import { BackButtonComponent } from '@components';
import { CatalogueService } from '@pages/catalogues/services/catalogue.service';

@Component({
  selector: 'app-catalogues',
  standalone: true,
  imports: [CommonModule, BookCardComponent, BackButtonComponent],
  templateUrl: './catalogues.component.html',
  styleUrls: ['./catalogues.component.css']
})
export class CataloguesComponent {

  private catalogueService = inject(CatalogueService);

  books$ = this.catalogueService.books$;
 
  bookCardTemplate = TemplateRef<BooksView>

  onDeleteBookEvent(book: BooksView) {
    this.catalogueService.removeBook(book)
  }
}

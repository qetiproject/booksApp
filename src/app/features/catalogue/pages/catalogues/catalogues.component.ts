import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef } from '@angular/core';
import { BookCardComponent } from '../../../books/components/book-card/book-card.component';
import { BooksView } from '../../../books/types/book';
import { CatalogueService } from '../../services/catalogue.service';

@Component({
  selector: 'app-catalogues',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './catalogues.component.html',
  styleUrls: ['./catalogues.component.scss']
})
export class CataloguesComponent {

  private catalogueService = inject(CatalogueService);

  books$ = this.catalogueService.books$;
 
  bookCardTemplate = TemplateRef<BooksView>
}

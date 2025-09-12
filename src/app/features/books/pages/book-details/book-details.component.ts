import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, Location } from '@angular/common';
import { Component, computed, inject, signal, TemplateRef, ViewChild, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BackButtonComponent } from '../../../../components/back-button/back-button.component';
import { CatalogueService } from '../../../../pages/catalogues/services/catalogue.service';
import { FavouriteBookService } from '../../../../pages/wishlist/services/favouriteBook.service';
import { showSnackbar } from '../../../../utils/snackbar';
import { BooksView } from '../../types/book';
import { BookDetails } from '../../types/book-details';

type TabKey = 'reviews' | 'addReview';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    BackButtonComponent, FormsModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
   animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' }))
      ])
    ])
  ]
})
export class BookDetailsComponent{
  private route = inject(ActivatedRoute);
  private snackbar = inject(MatSnackBar);
  private location = inject(Location)
  private router = inject(Router);
  private catalogueService = inject(CatalogueService);
  private favouriteService = inject(FavouriteBookService);
  
  readonly book: WritableSignal<BookDetails> = signal(this.route.snapshot.data['book']);
  readonly authorList = computed(() => this.book().volumeInfo.authors ?? []);
  readonly categoryList = computed(() => this.book().volumeInfo.categories ?? []);
  readonly thumbnail = computed(() => 
    this.book().volumeInfo.imageLinks?.thumbnail 
    || this.book().volumeInfo.imageLinks?.smallThumbnail 
    || 'assets/default-thumbnail.png'
  );
  currentTab: TabKey = 'reviews';

  @ViewChild('addReviewTemplate') addReviewTemplate!: TemplateRef<unknown>;

  tabs: { key: TabKey; label: string }[] = [
    { key: 'reviews', label: 'Reviews' },
    { key: 'addReview', label: 'Add Review' },
  ];

  goBack(): void {
    const canGoBack = window.history.length > 1;
    (canGoBack ? () => this.location.back() : () => this.router.navigate(['/books']))();
  }

  addToFavouritesEvent(): void {
    const book = this.book();
    const booksView: BooksView = {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      language: book.volumeInfo.language,
      imageLinks: {
        thumbnail: book.volumeInfo.imageLinks.thumbnail,
        smallThumbnail: book.volumeInfo.imageLinks.smallThumbnail
      }
    }
    this.favouriteService.addBookInFavourite(booksView);
    this.router.navigateByUrl('/favourites')
    showSnackbar(this.snackbar, `📚 "${this.book().volumeInfo.title}" წარმატებით დაემატა თქვენს ფავორიტებში!`);
  }
  
  addToCatalogueEvent(): void {
    const book = this.book();
    this.catalogueService.addBook(book);
    this.router.navigateByUrl('/catalogue')
    showSnackbar(this.snackbar, `📚 "${this.book().volumeInfo.title}" წარმატებით დაემატა თქვენს კატალოგში!`);

  }

  reviews: {title: string}[] = [
    {
      title: "hi1"
    },
    {
      title: "hi2"
    }
  ];
  selectTab(tab: TabKey) {
    this.currentTab = tab;
  }
}

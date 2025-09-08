import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, Location } from '@angular/common';
import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BackButtonComponent } from '../../../../components/back-button/back-button.component';
import { showSnackbar } from '../../../../utils/snackbar';
import { CatalogueService } from '../../../catalogue/services/catalogue.service';
import { BookDetails } from '../../types/book-details';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    BackButtonComponent
  ],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
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
  
  book: WritableSignal<BookDetails> = signal(this.route.snapshot.data['book']);

  authorList = computed(() => this.book().volumeInfo.authors ?? []);
  categoryList = computed(() => this.book().volumeInfo.categories ?? []);
  thumbnail = computed(() => 
    this.book().volumeInfo.imageLinks?.thumbnail 
    || this.book().volumeInfo.imageLinks?.smallThumbnail 
  );

  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/books']); // fallback page
    }
  }

  addToFavouritesEvent(): void {
    showSnackbar(this.snackbar, `📚 "${this.book().volumeInfo.title}" წარმატებით დაემატა თქვენს ფავორიტებში!`);
  }
  
  addToCatalogueEvent(book: BookDetails): void {
    this.catalogueService.addBook(book);
    this.router.navigateByUrl('/catalogue')
    showSnackbar(this.snackbar, `📚 "${this.book().volumeInfo.title}" წარმატებით დაემატა თქვენს კატალოგში!`);

  }
}

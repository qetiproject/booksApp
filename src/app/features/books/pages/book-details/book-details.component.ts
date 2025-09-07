import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookDetails } from '../../types/book';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule,   RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit{
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  book: WritableSignal<BookDetails | null> = signal(null);
  error: WritableSignal<string | null> = signal(null);

  authorist = computed(() => {
    const currentBook = this.book();
    return currentBook?.volumeInfo?.authors;
  })
  ngOnInit(): void {
    const loadedBook = this.route.snapshot.data['book'] as BookDetails | null;

    if (!loadedBook) {
      this.error.set('Sorry, this book could not be loaded.');
      this.router.navigate(['/home']);
      return;
    }

    this.book.set(loadedBook);
  }

}

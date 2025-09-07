import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
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
  bookService = inject(BookService);
  private route = inject(ActivatedRoute);
   private router = inject(Router);

  book: WritableSignal<BookDetails | null> = signal(null);
  
  ngOnInit(): void {
    // Get ID from route
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      // If no ID, redirect back to book list
      this.router.navigate(['/books']);
      return;
    }

    // Fetch book details
    this.bookService.bookById(id).subscribe(x => this.book.set(x));
  }

}

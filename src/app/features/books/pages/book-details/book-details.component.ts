import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
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

  book: WritableSignal<BookDetails> = signal(this.route.snapshot.data['book']);

  authorList = computed(() => this.book()?.volumeInfo.authors ?? []);
  categoryList = computed(() => this.book()?.volumeInfo.categories ?? []);
  thumbnail = computed(() => 
    this.book()?.volumeInfo.imageLinks.thumbnail 
    || this.book()?.volumeInfo.imageLinks.smallThumbnail 
  );


}

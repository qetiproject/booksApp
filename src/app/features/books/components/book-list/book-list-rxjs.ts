// import { CommonModule } from '@angular/common';
// import { Component, inject, input, signal, WritableSignal } from '@angular/core';
// import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
// import { ReactiveFormsModule } from '@angular/forms';
// import { catchError, of, switchMap } from 'rxjs';
// import { MessagesService } from '../../../../core/services/messages.service';
// import { BookService } from '../../services/book.service';
// import { BooksView } from '../../types/book';
// import { BookCardComponent } from '../book-card/book-card.component';

// @Component({
//   selector: 'app-book-list-rxjs',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, BookCardComponent],
//   templateUrl: './book-list.component.html',
//   styleUrls: ['./book-list.component.scss']
// })
// export class BookListComponent {

//   private bookService = inject(BookService);
//   private messageService = inject(MessagesService)

//   // inputs
//   searchQuery = input<string>('');
//   categorySelected = input<string | null>(null);

//   private searchQuery$ = toObservable(this.searchQuery);
//   private categorySelected$ = toObservable(this.categorySelected);

//   // result
//   searchedBooks: WritableSignal<BooksView[]> = signal([]);
//   loadBooksByCategory: WritableSignal<BooksView[]> = signal([]);
//   bookToShow: WritableSignal<BooksView[]> = signal([]);

//   constructor() {
//     this.searchData();
//     this.booksByCategory();
//   }

//   private searchData(): void{
//     this.searchQuery$
//       .pipe(
//         switchMap(query => 
//           query && query.length >= 3
//           ? this.bookService.searchBooksByName(query).pipe(
//              catchError(err => {
//                 this.messageService.showMessage(
//                   'Error searching books',
//                   'error'
//                 );
//                 return of([]);
//               }),
//             )
//           : of([])
//         ),
//         takeUntilDestroyed(),
//       )
//       .subscribe(result => {
//         this.searchedBooks.set(result)
//         this.updateBooksToShow(result);
//     });
//   }

//   private booksByCategory(): void {
//     this.categorySelected$
//       .pipe(
//         switchMap(category =>
//           category 
//             ? this.bookService.loadBooksByCategory(category)
//               .pipe(
//                 catchError(err => {
//                   this.messageService.showMessage(
//                     'Error searching books',
//                     'error'
//                   );
//                   return of([]);
//               }),
//               )
//             : of([])
//         ),
//         takeUntilDestroyed()
//       )
//       .subscribe(result => {
//         this.loadBooksByCategory.set(result);
//         this.updateBooksToShow(result);
//     })
//   }

//   updateBooksToShow(lastFetched: BooksView[]): void {
//     const combined: BooksView[] = [
//       ...lastFetched,
//       ...this.searchedBooks(),
//       ...this.loadBooksByCategory()
//     ]
//     const uniqueBooksMap = new Map<string, BooksView>();
//     combined.forEach(book => uniqueBooksMap.set(book.id, book));
//     this.bookToShow.set(Array.from(uniqueBooksMap.values()))
//   }

// }

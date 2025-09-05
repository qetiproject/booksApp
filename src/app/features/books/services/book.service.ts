import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, map, Observable, shareReplay } from 'rxjs';
import { BookData, BookResult, SearchBooksView } from '../types/book';

const bookApiBase ='https://www.googleapis.com/books/v1/volumes';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  http = inject(HttpClient);

  searchBooks(name: string): Observable<SearchBooksView[]> {
    return this.http.get<BookResult>(`${bookApiBase}?q=${name}`).pipe(
      map(response => {
        const items = response.items || [];
        return items.map(item => ({
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors || [],
          imageLinks: item.volumeInfo.imageLinks || { thumbnail: '', smallThumbnail: '' },
          language: item.volumeInfo.language || ''
        }));
      }), shareReplay(1)
    );
  }
}

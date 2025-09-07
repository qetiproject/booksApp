import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BookData, BookDetails, BookResult, BooksView } from '../types/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  http = inject(HttpClient);

  searchBooksByName(name: string): Observable<BooksView[]> {
    return this.http.get<BookResult>(`${environment.bookApiBase}?q=${name}`).pipe(
      map(response => {
        const items = response.items || [];
        return items.map(item => ({
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors || [],
          imageLinks: item.volumeInfo.imageLinks || { thumbnail: '', smallThumbnail: '' },
          language: item.volumeInfo.language || ''
        }));
      }), shareReplay(1)
    );
  }

  loadBooksByCategory(category: string | null): Observable<BooksView[]> {
    return this.http.get<BookResult>(`${environment.bookApiBase}?q=${category}`).pipe(
      map(response => {
        const items = response.items || [];
        return items.map(item => ({
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors || [],
          imageLinks: item.volumeInfo.imageLinks || { thumbnail: '', smallThumbnail: '' },
          language: item.volumeInfo.language || ''
        }));
      }), shareReplay(1)
      
    )
  }

  bookById(id: string): Observable<BookDetails> {
    return this.http.get<BookData>(`${environment.bookApiBase}/${id}`).pipe(
      map(response => ({
        id: response.id,
        saleInfo: {
          buyLink: response.saleInfo.buyLink,
          isEbook: response.saleInfo.isEbook,
          saleability: response.saleInfo.saleability
        },
        volumeInfo: {
          title: response.volumeInfo.title,
          authors: response.volumeInfo.authors || [],
          language: response.volumeInfo.language,
          imageLinks: {
            thumbnail: response.volumeInfo.imageLinks.thumbnail,
            smallThumbnail: response.volumeInfo.imageLinks.smallThumbnail
          },
          publisher: response.volumeInfo.publisher,
          publishedDate: response.volumeInfo.publishedDate,
          description: response.volumeInfo.description,
          pageCount: response.volumeInfo.pageCount,
          printType: response.volumeInfo.printType,
          categories: response.volumeInfo.categories || [],
          previewLink: response.volumeInfo.previewLink
        }
      }))
    );
  }


}

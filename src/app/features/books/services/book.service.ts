import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SkipLoading } from '../../loading/skip-loading.component';
import { BookResult, BooksView } from '../types/book';
import { BookDetails, BookDetailsResult } from '../types/book-details';

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
          language: item.volumeInfo.language || '',
          categories: item.volumeInfo.categories
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
          language: item.volumeInfo.language || '',
          categories: item.volumeInfo.categories
        }));
      }), shareReplay(1)
      
    )
  }

  // {
  //     context: new HttpContext().set(SkipLoading, true)
  //   }
  bookById(id: string): Observable<BookDetails> {
    return this.http.get<BookDetailsResult>(`${environment.bookApiBase}/${id}`, {
      context: new HttpContext().set(SkipLoading, true)
    }).pipe(
      map(response => {
        const volumeInfo = response.volumeInfo;
        return { 
          id: response.id,
          saleInfo: {
            ...response.saleInfo
          },
          volumeInfo: {
            ...response.volumeInfo,
            publisher: volumeInfo?.publisher || '',
            publishedDate: volumeInfo?.publishedDate || '',
            description: volumeInfo?.description || '',
            pageCount: volumeInfo?.pageCount || 0,
            printType: volumeInfo?.printType || '',
            categories: volumeInfo?.categories || [],
            previewLink: volumeInfo?.previewLink || ''
          }
        };
      })
    );
  }



}

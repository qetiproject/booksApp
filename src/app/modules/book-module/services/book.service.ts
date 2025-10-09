import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SkipLoading } from '@features/loading/skip-loading.component';
import { map, Observable, shareReplay } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BookResult, BooksView } from '../types/book';
import { BookDetails, BookDetailsResult } from '../types/book-details';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  http = inject(HttpClient);

  searchBooksByName(
    name: string | null, 
    maxResults: number, 
    startIndex: number
  ): Observable<{ items: BooksView[]; totalItems: number }> {
    return this.http.get<BookResult>(`${environment.bookApiBase}?q=${name}&maxResults=${maxResults}&startIndex=${startIndex}`).pipe(
      map(response => {
        const items = response.items || [];
        const mappedItems: BooksView[] = items.map(item => ({
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors || [],
          imageLinks: item.volumeInfo.imageLinks || { thumbnail: '', smallThumbnail: '' },
          language: item.volumeInfo.language || '',
          categories: item.volumeInfo.categories
        }));

        return {
          items: mappedItems,
          totalItems: response.totalItems || 0
        };
      }), shareReplay(1)
    );
  }

  loadBooksByCategory(
    category: string | null, 
    maxResults: number, 
    startIndex: number
  ): Observable<{ items: BooksView[]; totalItems: number }> {

    return this.http.get<BookResult>(`${environment.bookApiBase}?q=${category}&maxResults=${maxResults}&startIndex=${startIndex}`).pipe(
      map(response => {
        const items = response.items || [];
        const mappedItems: BooksView[] = items.map(item => ({
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors || [],
          imageLinks: item.volumeInfo.imageLinks || { thumbnail: '', smallThumbnail: '' },
          language: item.volumeInfo.language || '',
          categories: item.volumeInfo.categories
        }));

        return {
          items: mappedItems,
          totalItems: response.totalItems || 0
        };
      }),
      shareReplay(1)
    );
  }

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

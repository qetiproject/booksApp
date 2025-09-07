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
      map(response => {
        const saleInfo = response.saleInfo;
        const volumeInfo = response.volumeInfo;
        return { 
          id: response.id,
          saleInfo: {
            buyLink: saleInfo?.buyLink || '',
            isEbook: saleInfo?.isEbook || false,
            saleability: saleInfo?.saleability || ''
          },
          volumeInfo: {
            title: volumeInfo?.title || '',
            authors: volumeInfo?.authors || [],
            language: volumeInfo?.language || '',
            imageLinks: {
              thumbnail: volumeInfo?.imageLinks?.thumbnail || '',
              smallThumbnail: volumeInfo?.imageLinks?.smallThumbnail || ''
            },
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

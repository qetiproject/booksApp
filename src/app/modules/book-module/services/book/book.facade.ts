import { HttpClient, HttpContext } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { BookDetails, BookDetailsResult, BookResult, BooksView, LoadBooks, LoadBooksFailure } from "@book-module";
import { SkipLoading } from "@features";
import { Store } from "@ngrx/store";
import { PagingService } from "components/paging/paging.service";
import { map, Observable, shareReplay } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { selectBooks } from "../../store/book.selector";

@Injectable({
    providedIn: 'root'
})
export class BookFacadeService {
    http = inject(HttpClient);
    #store = inject(Store);
    #pagingService = inject(PagingService);
    books = toSignal(this.#store.select(selectBooks), { initialValue: [] });

    private getStartIndex() {
        return this.#pagingService.currentPage() - 1;
    }
    searchBooksByName
    (
        name: string | null, 
        maxResults: number, 
        startIndex: number,
        userId: number
        ): Observable<{ items: BooksView[]; totalItems: number }> {
        return this.http.get<BookResult>(`${environment.volumesUrl}?q=${name}&maxResults=${maxResults}&startIndex=${startIndex}`).pipe(
            map(response => {
            const items = response.items || [];
            
            const mappedItems: BooksView[] = items.map(item => ({
                id: item.id,
                title: item.volumeInfo.title,
                authors: item.volumeInfo.authors || [],
                imageLinks: item.volumeInfo.imageLinks || { thumbnail: '', smallThumbnail: '' },
                language: item.volumeInfo.language || '',
                categories: item.volumeInfo.categories,
                userId
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
        startIndex: number,
        userId: number
        ): Observable<{ items: BooksView[]; totalItems: number }> {

        return this.http.get<BookResult>(`${environment.volumesUrl}?q=${category}&maxResults=${maxResults}&startIndex=${startIndex}`).pipe(
            map(response => {
            const items = response.items || [];
            const mappedItems: BooksView[] = items.map(item => ({
                id: item.id,
                title: item.volumeInfo.title,
                authors: item.volumeInfo.authors || [],
                imageLinks: item.volumeInfo.imageLinks || { thumbnail: '', smallThumbnail: '' },
                language: item.volumeInfo.language || '',
                categories: item.volumeInfo.categories,
                userId
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
        return this.http.get<BookDetailsResult>(`${environment.volumesUrl}/${id}`, {
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
                },
            };
            })
        );
    }
      
    getBooks(query: string | null, category: string | null): void {
        if (query && query.length > 3) {
            category = null;
            this.#store.dispatch(LoadBooks({
                query,
                maxResults: this.#pagingService.maxResults(),
                startIndex: this.getStartIndex()
            }));
        } else if (category) {
            query = null;
            this.#store.dispatch(LoadBooks({
                query: category, 
                maxResults: this.#pagingService.maxResults(),
                startIndex: this.getStartIndex()
            }));
        } else {
            this.#store.dispatch(LoadBooksFailure({ error: 'No query or category selected' }));
        }
    }

    resetPage() {
        this.#pagingService.setCurrentPage();
    }
}